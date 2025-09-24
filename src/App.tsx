import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout'
import Delegation from './page/delegation'
import Wallet from './page/wallet'
import Tokenomics from './page/tokenomics'
import Validators from './page/validators'
import Blocks from './page/blocks'
import Transfers from './page/transfers'
import Wallets from './page/wallets'
import Transactions from './page/transactions'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/delegation" element={<Delegation />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/tokenomics" element={<Tokenomics />} />
          <Route path="/validators" element={<Validators />} />
          <Route path="/blocks" element={<Blocks />} />
          <Route path="/transfers" element={<Transfers />} />
          <Route path="/wallets" element={<Wallets />} />
          <Route path="/transactions" element={<Transactions />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
