export const chains = {
     mumbai: {
          chainId: '0x13881',
          name: 'Polygon',
          rpcTarget: 'https://indulgent-shy-aura.matic-testnet.discover.quiknode.pro/f3eadc815d04049d61d581cc6e1f6a6f152c7eec/',
          CrosschainDao: '0x050DFdE59f285018c8e036FB07d376a2C6513DCE',
          DataConsumer: '0x45bf1c05a233Af8C58b88aADC6aD44aD5d100030',
          VoteVerifier: '0x3430352A5CC115705A5a6d563Ae5fbC9C1673434',
          symbol: 'matic',
          blockExplorer: 'https://mumbai.polygonscan.com/',
          token: 'MATIC'
     },
     polygonZkEvm: {
          chainId: '0x5a2',
          name: 'polygonzkevm',
          rpcTarget: 'https://rpc.public.zkevm-test.net',
          CrosschainDao: '0x693be847F8bf09966C5A83b9c22E5a73C11178Bd',
          symbol: '',
          blockExplorer: 'https://testnet-zkevm.polygonscan.com/',
          token: 'ETH'
     },
     mantle: {
          chainId: '0x1389',
          name: 'Mantle',
          rpcTarget: 'https://rpc.testnet.mantle.xyz',
          CrosschainDao: '0xC584207ECfb0D9441E8d66a328fAc2D7E364E081',
          symbol: '',
          blockExplorer: 'https://explorer.testnet.mantle.xyz/',
          token: 'MNT'
     }
}