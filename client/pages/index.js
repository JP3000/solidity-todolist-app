import WrongNetworkMessage from '../components/WrongNetworkMessage'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import { useEffect, useState } from 'react'

import { TaskContractAddress } from '../config.js'
import TaskAbi from '../../backend/build/contracts/TaskContract.json'
import { ethers } from 'ethers'

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
  const [input, setInput] = useState('')
  const [tasks, setTasks] = useState([])

  useEffect(() => { 
    connectWallet()
    getAllTasks()
  }, [])

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
    try { 
      const {ethereum} = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )
        let allTasks = await TaskContract.getMyTasks()
        // debug
        console.log("All tasks:", allTasks)
        setTasks(allTasks)
      } else {
        console.log("Ethereum object does not exist")
      }
    } catch (error) { 
      console.error( error)
    }
  }

  // Add tasks from front-end onto the blockchain
  const addTask = async e => {
    e.preventDefault() // avoid refresh

    let task = { 
      taskText: input,
      isDeleted: false,
    }

    try { 
      const {ethereum} = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )

        TaskContract.addTask(task.taskText, task.isDeleted).then(res => { 
          setTasks([...tasks, task])
          console.log("Added task")
        }).catch(err => { 
          console.log(err)
        })
      } else { 
        console.log("Ethereum object dose not exist")
      } 
    } catch(error) { 
      console.log(error)
    }
    setInput('')
  }

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract 
  const deleteTask = key => async () => {
    try { 
      const {ethereum} = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        )
        const deleteTaskText =  await TaskContract.deleteTask(key, true)
        console.log('successfully deleted task: 🎉 ', deleteTaskText)

        let allTasks = await TaskContract.getMyTasks()
        setTasks(allTasks)

      } else { 
        console.log("Ethereum object does not exist")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='bg-[#fff7e0] h-screen w-screen flex justify-center py-6'>
      { !isUserLoggedIn ? <ConnectWalletButton connectWallet = {connectWallet}/> :
        correctNetwork ?  <TodoList tasks={tasks} input={input} setInput={setInput} addTask={addTask} deleteTask={deleteTask}/> : <WrongNetworkMessage /> }
    </div>
  )
}