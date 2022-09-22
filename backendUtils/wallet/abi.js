//index.js

// The minimum ABI to get ERC20 Token balance

export const minABI = [
    // balanceOf
    {
      constant: true,
  
      inputs: [{ name: "_owner", type: "address" }],
  
      name: "balanceOf",
  
      outputs: [{ name: "balance", type: "uint256" }],
  
      type: "function"
    },
     // transfer
  {
    'constant': false,
    'inputs': [{
        'name': '_to',
        'type': 'address'
      },
      {
        'name': '_value',
        'type': 'uint256'
      }
    ],
    'name': 'transfer',
    'outputs': [
      {
        'name': '',
        'type': 'bool'
      }
    ],
    'type': 'function'
  }
  ];
  