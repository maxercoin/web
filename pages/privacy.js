import React from "react";
import Head from "next/head";
import {
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import Link from "next/link";
import Headercomponent from "../components/header/header";
import Footercomponent from "../components/footer/footer";
function Privacy() {
  return (
    <>
      <Head>
        <title>Maxercoin Privacy Statement</title>
      </Head>
      <Headercomponent />
      <Text fontSize="1.5em" as="h1" fontWeight="bold">
        Maxercoin privacy statement
      </Text>
      <Text>Last update: 11 January 2022</Text>
      <Text>This privacy statement comes into effect on 1 Feb 2022.</Text>
      <Text>
        This statement is for products and services. It applies to anyone who
        interacts with us, regardless of whether or not you're a Maxercoin
        customer. Maxercoin is invest Limited, so when we say &#39;we&#39;,&#39;
        &#39;us &#39; or &#39;our&#39;, we mean either Maxercoin Invest Limited{" "}
      </Text>
      <Text>
        When you use Maxercoin, you agree that we may collect, use, store, and
        share your personal information as we&#39;ve described in this
        statement. You&#39;ll be told about (and be asked to agree to) any
        additional privacy terms for a particular product or service when you
        sign up to it.{" "}
      </Text>
      <Text>
        We want you to understand what personal information we collect and store
        about you when you interact with us, what we will do with that
        information, and who we might share that information with.
      </Text>
      <Text fontSize="1.2em" fontWeight="bold" paddingTop="2px">
        That&#39;s what this statement covers.
      </Text>
      <Text>
        We may need to change this statement from time to time, but the latest
        version will always be available on our website. We will usually give at
        least 14 days&#39; notice to customers of any changes to this statement
        but may not be able to for urgent changes we need to make to protect
        security or meet law changes. Your continued use of our products,
        services, websites and tools after the end of the notice period will be
        treated as your acceptance of the updated statement.{" "}
      </Text>
      <Text>
        New Zealand privacy law sets out the rules we must follow in collecting,
        storing, using and sharing any personal information you give us. When we
        say &#39;New Zealand privacy law&#39;, we mean the law in New Zealand
        that covers personal information that&#39;s in force at the time that
        you use our services. This includes codes of conduct issued by the
        Privacy Commissioner that apply to our services to you.
      </Text>
      <Text fontSize="1.2em" fontWeight="bold" paddingTop="2px">
        Information we collect and how we use it
      </Text>
      <Text>
        We may collect the following information from you when you use our
        Website, tools, products or services.
      </Text>
      <div
        style={{ width: "100vw", height: "2px", backgroundColor: "#000" }}
      ></div>
      <Table>
        <Thead>
          <Tr>
            <Th>Type of personal information collected</Th>
            <Th>When</Th>
            <Th>Why</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>
              Your name, address, and contact details (including email address)
            </Td>
            <Td>
              When you sign up to our products or services, or when you provide
              it to us (for example, on the contact form on our website)
            </Td>
            <Td>
              So that we can identify you, communicate with you, and provide you
              with information relevant to your needs and our products and
              services.
            </Td>
          </Tr>
          <Tr>
            <Td>Your bank account details</Td>
            <Td>
              When you make an initial deposit into Maxercoin or share a bank
              statement with us
            </Td>
            <Td>
              So that we can identify where and who we’re receiving payments
              from, and to make payments to you
            </Td>
          </Tr>
          <Tr>
            <Td>
              Your tax details (including international tax details, such as
              TIN){" "}
            </Td>
            <Td>When you sign up to use our products or services</Td>
            <Td>
              So that we and/or our partners in providing services to you comply
              with our tax obligations including under the Automatic Exchange of
              Information or Foreign Account Tax Compliance.
            </Td>
          </Tr>
          <Tr>
            <Td>
              Your identity information, e.g. New Zealand passport, a power bill
            </Td>
            <Td>When you sign up to use our products or services.</Td>
            <Td>
              So that we comply with our obligations under the Anti-Money
              Laundering and Countering Financing of Terrorism Act 2009.
            </Td>
          </Tr>
          <Tr>
            <Td>
              Transaction details (such as your orders and deposits) and other
              account and financial information (e.g. salary, where your money
              comes from, investment expectations, occupation)
            </Td>
            <Td>
              When you sign up to Maxercoin and when you transact through
              Maxercoin
            </Td>
            <Td>
              So that we can provide our services to you, personalise those
              services, enable the Maxercoin website to function, and to comply
              with legal obligations including under the Anti-Money Laundering
              and Countering Financing of Terrorism Act 2009
            </Td>
          </Tr>
          <Tr>
            <Td>
              Information relating to your use of the website(s) and tools such
              as device related information (IP address), activity and pages
              visited.
            </Td>
            <Td>When you use our services</Td>
            <Td>
              So that we can provide our services to you, personalise those
              services and assist our software function.
            </Td>
          </Tr>
          <Tr>
            <Td>Date of birth, or age</Td>
            <Td>When you sign up to Maxercoin</Td>
            <Td>To identify you and provide services to you.</Td>
          </Tr>
          <Tr>
            <Td>Your voice and/or image</Td>
            <Td>
              When we record our interactions with you (having notified you of
              the recording in advance) e.g. when you call us, or participate in
              research for us.
            </Td>
            <Td>
              For research, training, record-keeping and audit purposes, to
              ensure accuracy and quality of information and to improve our
              service and services.
            </Td>
          </Tr>
          <Tr>
            <Td>
              Any personal information we need to collect about you to deliver
              our products and services, including the above.
            </Td>
            <Td>
              The circumstances described above, and otherwise during your
              interaction with us
            </Td>
            <Td>
              For the purposes set out in Other Use below, and as otherwise set
              out in the Statement
            </Td>
          </Tr>
        </Tbody>
      </Table>
      <Text fontSize="1.2em" fontWeight="bold" paddingTop="2px">
        Consequences of not providing us information
      </Text>
      <Text>
        If you don&#39;t provide information we have requested, we may not be
        able to provide the products or services to you or answer your
        questions. Please ask if you are unsure what information is important
        and why we&#39;re collecting it. The bolded information in the table is
        essential for us to have a business relationship with you. The other
        information is required for some products and services, but not others.
      </Text>
      <Text fontSize="1.2em" fontWeight="bold" paddingTop="2px">
        Other uses
      </Text>
      <Text>
        We only use your information in the way described in this statement, or
        if allowed under our terms and conditions of providing a service to you
        or the law allows it.
      </Text>
      <Text>
        We&#39;ve outlined the specific ways we&#39;ll use your information
        above.
      </Text>
      <Text>We might also use your personal information to:</Text>
      <UnorderedList>
        <ListItem paddingLeft="5px">
          Provide, evaluate and improve our service, services and products
        </ListItem>
        <ListItem paddingLeft="5px">
          Contact or market to you using social media
        </ListItem>
        <ListItem paddingLeft="5px">
          Contact you about incomplete information or information you&#39;ve
          provided for products or services
        </ListItem>
        <ListItem paddingLeft="5px">
          Respond to enquiries or complaints or to protect and enforce our
          rights as part of our relationship with you
        </ListItem>
        <ListItem paddingLeft="5px">
          Comply with applicable laws or legal rules
        </ListItem>
        <ListItem paddingLeft="5px">
          Conduct market research, data processing and statistical analysis
          activities and
        </ListItem>
        <ListItem paddingLeft="5px">
          Let you know about offers, accounts, products and services that might
          be of interest to you (including from our related organisations and
          selected business partners). However, if you ask us not to provide you
          this information we will comply with your request
        </ListItem>
        <ListItem paddingLeft="5px">
          support our own administrative and business purposes (such as audits)
        </ListItem>
      </UnorderedList>
      <Text>
        If you are a citizen of New Zealand or another country we may also have
        to provide information to a government agency in relation to your tax
        status to comply with our legal obligations.
      </Text>
      <Text>
        If we need to use your information for another purpose which isn&#39;t
        directly related to one of the purposes listed above and which you
        haven&#39;t otherwise authorised us to use your information for, we will
        contact you to get your consent before we do.
      </Text>
      <Text>
        If you are a citizen of New Zealand or another country we may also have
        to provide information to a government agency in relation to your tax
        status to comply with our legal obligations.
      </Text>
      <Text>
        If we need to use your information for another purpose which isn&#39;t
        directly related to one of the purposes listed above and which you
        haven&#39;t otherwise authorised us to use your information for, we will
        contact you to get your consent before we do.
      </Text>
      <Text fontSize="1.2em" fontWeight="bold" paddingTop="2px">
        Who we collect information from
      </Text>
      <Text>
        We will usually gather information from you directly, but sometimes we
        may collect information about you from other people. We will only
        collect information about you from other people if we reasonably believe
        it&#39;s necessary to do so, beneficial to you, or you have authorised
        us to. Sometimes, we may collect information about other people from
        you, if you provide that information to us (e.g. while setting up a
        trust account). If you do provide us with someone&#39;s personal
        information, you must make sure you have that person&#39;s authority to
        do so and you must make sure that person knows that their information
        may be used by us in the circumstances set out in this statement.
      </Text>
      <Text>
        By agreeing to use our products, service or tools, you authorise us to
        collect information about you from any other person who can provide us
        with information that relates to a purpose listed above and is necessary
        for that purpose. We may make enquiries about any information that you
        provide to us in order to check the accuracy of the information. This
        may include providing the information to agencies engaged by us to
        verify your identity or address information. This includes Verifi
        Identity Services Limited, known as Cloudcheck or Dow Jones &amp;
        Company, Inc, known as Dow Jones.
      </Text>
      <Text fontSize="1.2em" fontWeight="bold" paddingTop="2px">
        Sharing your information
      </Text>
      <Text>You agree that we can share your personal information with:</Text>
      <UnorderedList>
        <ListItem paddingLeft="5px">
          Any person in New Zealand that provides services to or for us or our
          related organisations and who needs it to assist us with the purposes
          listed above
        </ListItem>
        <ListItem paddingLeft="5px">
          Any person overseas that provides services to or for us or our related
          organisations. We and or related organisations will only engage an
          overseas person to provide services to us in relation to personal
          information if we are comfortable they will protect that information
          in a way that is comparable to NZ privacy law. If we cannot get that
          comfort, we need to get your authorisation before sharing any of your
          information with that person .
        </ListItem>
        <ListItem paddingLeft="5px">
          Our related organisations who may also store, use and disclose it in
          accordance with this statement
        </ListItem>
        <ListItem paddingLeft="5px">
          Debt collection agencies if you owe us money
        </ListItem>
        <ListItem paddingLeft="5px">
          Agencies engaged by us to verify customer identity or address
          information
        </ListItem>
        <ListItem paddingLeft="5px">
          Organisations conducting market research, data processing and
          statistical analysis for us
        </ListItem>
        <ListItem paddingLeft="5px">
          Our assignees or potential assignees
        </ListItem>
        <ListItem paddingLeft="5px">
          Law enforcement authorities, the courts, government agencies,
          regulatory authorities or third parties, both in New Zealand and
          overseas, where we are required to or we believe the disclosure will
          assist us to comply with any law or legal rules or will assist in the
          investigation, detection and/or prevention of fraud, money laundering
          or other criminal offences
        </ListItem>
        <ListItem paddingLeft="5px">
          Anyone that we need to contact to carry out your instructions to us
          (including the recipient of any payment)
        </ListItem>
        <ListItem paddingLeft="5px">
          Anyone you authorise us to disclose that information to.
        </ListItem>
        <ListItem paddingLeft="5px">
          When it will be used in a way that can&#39;t identify you
        </ListItem>
        <ListItem paddingLeft="5px">
          For statistical or research purposes when it won&#39;t be published in
          a way that could identify you and
        </ListItem>
        <ListItem paddingLeft="5px">
          In other limited circumstances permitted by New Zealand privacy law.
        </ListItem>
      </UnorderedList>
      <Text fontSize="1.2em" fontWeight="bold" paddingTop="2px">
        Your rights of access to and correction of information
      </Text>
      <Text>
        We take reasonable precautions to ensure that the information we hold
        about you is accurate, although this does depend on you telling us about
        any changes that mean the information we hold about you is no longer
        correct (e.g. your name, address, phone number or tax information). You
        may ask us for access to the information we hold about you and, if
        necessary, request corrections to it. Under New Zealand privacy law we
        may charge you for this.
      </Text>
      <Text>
        If we are not prepared to make the change you seek, you are entitled to
        ask us to attach a statement of correction to the relevant personal
        information.
      </Text>
      <Text>
        If you would like access to the information we hold about you, please
        <Link style={{ color: "blue" }} href="https://maxercoin.com/#contactus">
          contact us
        </Link>{" "}
        using the details in the{" "}
        <Link style={{ color: "blue" }} href="https://maxercoin.com/#contactus">
          Contact Us
        </Link>{" "}
        link on our Website.
      </Text>
      <Text fontSize="1.2em" fontWeight="bold" paddingTop="2px">
        Keeping your personal information
      </Text>
      <Text>
        We may store your information in either physical (documentary) or
        electronic form, and we may contract a third party or related entity to
        store it (either in New Zealand or overseas).
      </Text>
      <Text>
        Third parties or related entities which hold your information may be
        subject to laws or legal rules which require them to disclose your
        information. If they are based overseas that may include overseas laws
        and rules. Under New Zealand privacy law we are still responsible for
        the safekeeping of your personal information and we take security of it
        seriously, so we make sure that anyone we contract to hold information
        for us takes care to protect it from unauthorised disclosure, loss or
        misuse and is subject to appropriate privacy laws or complies with other
        privacy safeguards (such as encryption).{" "}
      </Text>
      <Text>
        Under New Zealand privacy law, we may only retain your personal
        information for as long as it may be lawfully used. Even if you have
        stopped using our products and services, we will usually have legal
        obligations to retain your information for a period of time. If you
        would like us to delete your information, please contact us to discuss
        by using the details in the Contact Us link on our Website.
      </Text>
      <Text fontSize="1.2em" fontWeight="bold" paddingTop="2px">
        Cookies
      </Text>
      <Text>
        We may use cookies when you are on our Website. They may be used for
        security (such as to help us identify you), to provide necessary
        functionality for our Website, to provide you with personalised features
        and for tracking traffic to and from, as well as on our site. Cookies
        are small pieces of information which can be stored on your hard drive
        or in memory. The cookies we send to your PC cannot read your hard drive
        or command your computer to perform any action.
      </Text>
      <Text>
        Some of our third party service providers (like those providing live
        chat or chatbot capability to us) may also use cookies in order to help
        them provide their services to us.
      </Text>
      <Text>
        You can prevent new cookies from being installed and delete existing
        cookies. The procedure depends on which browser you are using. For
        information on how to remove cookies check your internet browser. You
        may be unable to log on to our secure services without accepting our
        cookies.
      </Text>
      <Text fontSize="1.2em" fontWeight="bold" paddingTop="2px">
        Website Analytics Tools
      </Text>
      <Text>
        To improve our Website(s), we may use patterns and other meaningful
        information gathered from web analytics tools (including
        &#39;cookies&#39; and Google Analytics) to measure your usage of our
        Website(s). This may include traffic to, from and within our Website(s),
        your mouse click activity, your IP address, and other personal
        information that you voluntarily enter into the Website(s). All
        information collated by these web analytics tools is to help us better
        understand usage of our Website(s).{" "}
      </Text>
      <Text>
        For further information about Google Analytics{" "}
        <Link
          style={{ color: "blue" }}
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
        >
          click here
        </Link>
        , and for details of Google's Privacy Policy{" "}
        <Link
          style={{ color: "blue" }}
          href="https://policies.google.com/privacy?gl=nz"
          target="_blank"
        >
          click here
        </Link>
        .
      </Text>
      <Text fontSize="1.2em" fontWeight="bold" paddingTop="2px">
        Name and Address of entities collecting and holding your personal
        information
      </Text>
      <Text>
        Maxercoin Invest collects and holds your personal information. You can
        contact any of us by using the &#39;Contact Us&#39; link on any of our
        Website(s).
      </Text>
      <Footercomponent />
    </>
  );
}

export default Privacy;
