// import React from 'react'
// import { Button, Header, Image, Modal } from 'semantic-ui-react'
// import {connect} from 'react-redux'

// const submitDeposit = (e) => {
//     e.preventDefault()
//     console.log(e.target.amount.value)
// }
// **** const 

// const mstp = (appState) => {

//   console.log(appState)
// }

// const ModalDeposit = () => (
//   <Modal trigger={<Button color='black'>Deposit</Button>} centered={false}>
//     <Modal.Header>Select a Photo</Modal.Header>
//     <Modal.Content image>
//       {/* <Image wrapped size='medium' src='https://react.semantic-ui.com/images/avatar/large/rachel.png' /> */}
//       <Modal.Description>
//         <Header>Make a deposit</Header>
//         <form onSubmit = {submitDeposit}>
//           <label htmlFor="">Deposit Amount</label>
//           <input type="number" name = 'amount' />
//           <br/>
//           <input type="submit"/>
//         </form>
//         <p>Is it okay to use this photo?</p>
//       </Modal.Description>
//     </Modal.Content>
//   </Modal>
// )


// export default connect(mstp)(ModalDeposit)

import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import {connect} from 'react-redux'
import {onlineCheckingDeposit} from './Redux/actions'
import swal from 'sweetalert';
import {withRouter} from 'react-router-dom'
export class ModalDeposit extends Component {
  
      submitDeposit = (e) => {
          e.preventDefault()
          const amount = e.target.amount.value
          // console.log(this.props.user.checking.id)
          const checkingId = this.props.user.checking.id
          // Multiple of 20  , minium deposit is 20 
      if(amount < 20){
          swal('Please make a minimum deposit of $20')
      }
      
      else if (amount > 5000){

          swal(
            'Alert!!',
            'Deposit Amount is too large, please visit one of our five thousands branches.',
            'error')
      }

      else{
        swal(``,
        "Deposit Made",
        "success");
      
          fetch(`http://localhost:3000/checkings/deposit/${checkingId}`, {
              method:'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
              },
              body:JSON.stringify({
                amount,
                checkingId
              })
          })
          .then(res => res.json())
          // User obj here contains the new checking trans array. 
          .then(updatedUserObj => {
              this.props.onlineCheckingDeposit(updatedUserObj)
          })
          // this.props.history.push(`/account/${this.props.user.id}`)
          // this.props.history.goBack()
      }}

  renderEnglish = () => {
    return (
      <Modal trigger={<Button color='black'>Deposit</Button>} centered={false}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>Make a deposit</Header>
          <p>Available balance: ${this.props.user.checking.balance} </p>
          <form onSubmit = {this.submitDeposit}>
            <label htmlFor="">Deposit Amount</label>
            <input type="number" name = 'amount' />
            <br/>
            <input type="submit"/>
          </form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    )
  }

  renderChinese = () => {
    return (
      <Modal trigger={<Button color='black'>进行存款</Button>} centered={false}>
      <Modal.Header>Select a Photo</Modal.Header>
      <Modal.Content image>
        <Modal.Description>
          <Header>存款交易</Header>
          <p>当前账户余额: ${this.props.user.checking.balance} </p>
          <form onSubmit = {this.submitDeposit}>
            <label htmlFor="">存款的金额</label>
            <input type="number" name = 'amount' />
            <br/>
            <button type ='submit'> 提交 </button>
          </form>
        </Modal.Description>
      </Modal.Content>
    </Modal>
    )
  }
      
  render() {
    const languageTernry = this.props?.language==='Chinese'? this.renderChinese(): this.renderEnglish()
return(
    <>
      {languageTernry}
    </>)
}
}

    const mstp = (appState) => {

      return appState
    }


export default connect(mstp, {onlineCheckingDeposit})(withRouter(ModalDeposit))
