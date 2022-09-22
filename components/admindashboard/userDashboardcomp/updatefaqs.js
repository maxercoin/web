import { Box, Button, Input,Select,Text } from '@chakra-ui/react'
import React,{useEffect, useState,useRef} from 'react'
import colors from '../../utils/colors'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import {Editable, EditableInput, EditableTextarea, EditablePreview,ButtonGroup,Flex,useEditableControls,IconButton} from '@chakra-ui/react';
import {CheckIcon,EditIcon,CloseIcon,DeleteIcon} from '@chakra-ui/icons'

function Updatefaqs() {
  const toast = useToast()
  // const [titlevaue,setTitle] = useState('');
  const titleref = useRef();
  let title = titleref.current?.value
  // const [contentvalue,setFaqBody] = useState('');
  const contentRef = useRef();
  let content = contentRef.current?.value;
  const [error,setError] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  const [savedFaqs,setSavedFaqs] = useState([]);
  const [errorSavedFaqs,setErrorSavedFaqs] = useState('')
  const [update,requestUpdate] = useState(false);  

  const submitForm = async ()=>{
    setIsLoading(true)
    if(!title || !content ){
      setIsLoading(false)
      setError('Title and Body must be provided!');
    }else{
    try{
      setError(v=>'')
      const submit = await axios({
        method: 'post',
        headers:{'Content-Type': 'application/json','Authorization': `Bearer ${sessionStorage.getItem(process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY)}` },
        url: '/api/admin/updateinfo/faqs',
        data: {title,content}
      });
      if(submit.status === 200){
        await getFaqs()
        // setTitle('')
        // setFaqBody('')
        toast({
          title: 'FAQ created.',
          description: "Your FAQ was successfully uploaded!.",
          status: 'success',
          duration: 3600,
          isClosable: true,
        })
        setIsLoading(false);
      }
    }catch(e){
      console.log(e);
      setIsLoading(false);
      setError("An error occured while submitting")
    }
    
    }
    

  }
  const getFaqs = async ()=>{
    setErrorSavedFaqs('Getting Faqs...')
    const faqs = await axios.get('/api/admin/updateinfo/faqs')
    if(faqs.data.items.length > 0){
      setErrorSavedFaqs('')
      const returnedFaqs = faqs.data.items.reverse()
      setSavedFaqs(v=>returnedFaqs)
      requestUpdate(v => !v)
    }else{
      setErrorSavedFaqs('No saved Faqs, Kindly save some.')
    }
  }
  const deleteFaq =async (id) =>{
    const submit = await axios({
      method: 'delete',
      headers:{'Content-Type': 'application/json','Authorization': `Bearer ${sessionStorage.getItem(process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY)}` },
      url: '/api/admin/updateinfo/faqs?faqid='+id,
    });
    console.log(submit)
    if(submit.status === 200){
     await getFaqs();
     toast({
      title: 'FAQ deleted.',
      description: "Your FAQ was successfully deleted!.",
      status: 'success',
      duration: 3600,
      isClosable: true,
    })
    }
  }
  const updateFaqs =async(id,editedTitle,editedContent)=>{
    console.log(editedTitle," ", editedContent)
    const updateItem = await axios({
      method:'patch',
      url:`/api/admin/updateinfo/faqs?faqid=${id}`,
      headers:{'Content-Type': 'application/json','Authorization': `Bearer ${sessionStorage.getItem(process.env.NEXT_PUBLIC_ADMIN_AUTH_STORAGE_KEY)}`},
      data:JSON.stringify({title:editedTitle,content:editedContent})
    })
    if(updateItem.status === 200){
      getFaqs()
      console.log(updateItem.data)
      toast({
        title: 'FAQ Updated.',
        description: "Your FAQ was successfully updated!.",
        status: 'success',
        duration: 3600,
        isClosable: true,
      })
    }else{
      toast({
        title: 'En error occured.',
        description: "Please try again or referesh!.",
        status: 'error',
        duration: 3600,
        isClosable: true,
      })
    }
  }
  useEffect(()=>{
    getFaqs()
  },[])
  function EditableControls({id}) {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls()
    
    return isEditing ? (
      <ButtonGroup justifyContent='right' size='sm'>
        <IconButton  icon={<CheckIcon color='#000' />} {...getSubmitButtonProps()} />
        <IconButton icon={<CloseIcon color='#000'/>} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : (
      <Flex justifyContent='right' ml='2' gap={1}>
        <IconButton size='sm' icon={<EditIcon color='#000' />} {...getEditButtonProps()} />
        <IconButton isLoading={isLoading} onClick={(e)=>{deleteFaq(id)}} size='sm' icon={<DeleteIcon color='#000' />}  />
      </Flex>
    )
  }
  return (
    <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center' w='100%' h='90%' padding={2}>
      <Box display='flex'  flexDirection='column' borderRadius='10px' w='80%' h='max-content' pb='1' border='1px solid #fff'>
        
         
          <Box display='flex' justifyContent='space-between'  mt='3' mb={3} ml='5' gap='5' w='70%'>
          <Text color='#fff' fontWeight='500'>Title </Text>
          <Input   type='text' ref={titleref}  bg='#fff' w='60%' />
          </Box>
          <Box display='flex' justifyContent='space-between'  mt='3' ml='5' gap='5' w='70%'>
          <Text color='#fff' fontWeight='500'>Body:</Text>
          <Input  ref={contentRef} type='text'  bg='#fff' w='60%' />
          </Box>
          {error != "" && <Text color='#ff0000' placeSelf='center'><i>{error}</i></Text>}
          <Button onClick={submitForm} isLoading={isLoading} mt='5' _hover={{bg:colors.deg1color,color:'#fff'}} alignSelf='center'>ADD</Button>
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent='top' className='dashboardscroll' overflowY='scroll' mt={2} borderRadius='10px' w='80%' h='60%' border='1px solid #fff'>
    {errorSavedFaqs != '' && <Text color='#fff' justifySelf='center' alignSelf='center' fontSize='1.5em' fontWeight='700'>{errorSavedFaqs}</Text>}
    { (errorSavedFaqs === '' && savedFaqs.length > 0) &&(savedFaqs.map((v,index)=>{
                 return <Box w='98%' ml='2' mr='2' mt='2' border='1px solid #fff' p='1' borderRadius='5px' key={`${index}faqstoupdate`}>
          <Editable textAlign='left' w='100%' onSubmit={(e)=>{updateFaqs(v._id,e,v.content)}} borderBottom='1px dashed #fff' display='flex' color='#fff' defaultValue={v.title}fontSize='1.2em'isPreviewFocusable={false}>
                              <EditablePreview />
                              <Input as={EditableInput} />
                              <EditableControls id={v._id} />
                            </Editable>
          <Editable textAlign='left' display='flex' onSubmit={(e)=>{updateFaqs(v._id,v.title,e)}} color='#fff' defaultValue={v.content} fontSize='0.8em'isPreviewFocusable={false}>
                              <EditablePreview />
                              <Input as={EditableInput} />
                              <EditableControls id={v._id}  />
                            </Editable>
                            
                            </Box>
                           })  )
                          }
</Box>
    </Box>
  )
}

export default Updatefaqs