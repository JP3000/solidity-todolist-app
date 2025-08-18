import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import { useState } from 'react'

import { TaskContractAddress } from '../config.js'
import TaskAbi from '../../backend/build/contracts/TaskContract.json'
import {ethers} from 'ethers'

/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {
  const [correctNetwork, setCorrectNetwork] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {
    try { 
      const {ethereum} = window
      if (!ethereum) {
        console.error("MetaMask not detected")
        return
      }

      // 1. 先请求账户授权，MetaMask 会弹窗
      const accounts = await ethereum.request({method: 'eth_requestAccounts'})
      setIsUserLoggedIn(true)
      setCurrentAccount(accounts[0])

      // 2. 再检测网络
      let chainId = await ethereum.request({method: 'eth_chainId'})
      console.log("Connected to chain:", chainId)
      const sepoliaChainId = '0xaa36a7'
      if (chainId !== sepoliaChainId) {
        alert("you are not connected to the Sepolia testNet!")
        setCorrectNetwork(false)
        return
      } else {
        setCorrectNetwork(true)
      }

      console.log("Found account:", accounts[0])
    } catch (error) { 
      console.error("Error connecting wallet:", error)
    }
  }

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {

  }

  // Add tasks from front-end onto the blockchain
  const addTask = async e => {

  }

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = key => async () => {

  }

  return (
    <div className='bg-[#97b5fe] h-screen w-screen flex justify-center py-6'>
      {'is user not logged in' ? <ConnectWalletButton connectWallet = {connectWallet}/> :
        'is this the correct network' ? <WrongNetworkMessage /> : <TodoList />}
    </div>
  )
}