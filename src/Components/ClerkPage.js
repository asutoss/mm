import '../style/clerkPage.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import MealCosts from './MealCosts';
import {changeBreakFast,changeLunch, changeDinner} from '../actions/mealCosts';
import database from '../firebase/firebase';
import MessOffElement from './messOffElement';
import WastageElement from  './wastageElement';
import Complaint from './complaint';

const axios = require('axios');

var data = [];

const func = async() => {
    const ata = await axios.get('https://us-central1-hactathon2019.cloudfunctions.net/nitjalandhar/per_for_clerk');
        data = ata.data;
}



window.onload = func();

class ClerkPage extends React.Component { 
    state={
        messOffList : [],
        vis: false,
        messWastage : [],
        visforW : false,
        complaints : []
    }

    handleMessOffList = () => {
        database.ref('messOffList')
          .once('value')
          .then((snapshot) => {
                var list = [];
                snapshot.forEach((childSnapshot) => {
                    console.log(childSnapshot);
                    list.push(
                        {
                        rollNo : childSnapshot.node_.children_.root_.value.value_,
                        startDate : childSnapshot.node_.children_.root_.right.value.value_,
                        endDate : childSnapshot.node_.children_.root_.left.value.value_
                    }
                    );
                })
                

                this.setState((prevState)=>{
                    return{
                        ...this.state,
                        messOffList: list,
                        vis: !prevState.vis
                    }
                });

          })
          .catch((e) => {
              console.log('Error fetching data ', e);
          });

    }

    handleFoodWasteManagement = () => {
    
        this.setState((prevState)=>{
            return{
                ...this.state,
                messWastage : data,
                visforW : !prevState.visforW
            }
        });
    }

    handleLogOut = () => {
        this.props.history.push('/');
    }

    handleComplaints = (e) => {
        e.preventDefault();

        database.ref('complaints')
        .once('value')
        .then((snapshot) => {
              var list = [];
              snapshot.forEach((childSnapshot) => {
                  console.log(childSnapshot);
                  list.push(
                      {
                      rollNo : childSnapshot.node_.children_.root_.value.value_,
                      complaint : "temp"
                      
                  }
                  );
              })
              

              this.setState((prevState)=>{
                  return{
                      ...this.state,
                      complaints: list
                  }
              });

        })
        .catch((e) => {
            console.log('Error fetching data ', e);
        });
    }

    render(){
        return(
            <div className='clerkPage'>
                <div className='mealCosts'>
                    <MealCosts  
                        onSubmitA={(breakFast) => {
                            this.props.dispatch(changeBreakFast(breakFast));
                        }}
                        onSubmitB={(lunch) => {
                            this.props.dispatch(changeLunch(lunch));
                        }}
                        onSubmitC={(dinner) => {
                            this.props.dispatch(changeDinner(dinner));
                        }}
                    />
                </div>
                <div className='link'>
                    <Link to='/createAccount'>
                        <button >Create Account</button>
                    </Link>
                    
                    <div className='list-body'>
                        {
                            this.state.visforW === false ? (
                                <div className='list-item list-item--message'>

                                </div>
                            ) : (
                                <div>
                                    {   
                                        
                                        <div>
                                            {
                                                this.state.messWastage.map((x) => {
                                                    return <WastageElement key={x} value={x}/>
                                                })  
                                            }
                                        </div>
                                          
                                    }
                                </div>
                            )
                        }
                    </div> 
                    <button onClick={this.handleFoodWasteManagement}>Food Wastage Analysis</button>


                </div>
                <div className='messOffList'>
                    <div className='list-body'>
                        {
                            this.state.vis === false ? (
                                <div className='list-item list-item--message'>
                                    
                                </div>
                            ) : (
                                <div>
                                    {
                                        this.state.messOffList.map((data) => {
                                            return <MessOffElement key={data.rollNo} {...data}/>
                                        })    
                                    }
                                </div>
                            )
                        }
                    </div>        
                    <button onClick={this.handleMessOffList} >{this.state.vis ? 'Hide' : 'Mess Off List'}</button>
                </div>
                <div>
                    <form>
                        <button onClick={this.handleComplaints}>Complaints</button>
                        {
                            this.state.complaints.map((x) => {
                                return <Complaint key={x.rollNo} {...x} />
                            })
                        }
                    </form>
                </div>
                <div>
                    <button onClick={this.handleLogOut} >LogOut</button>
                </div>
            </div>
        );
    }
}
    


export default connect()(ClerkPage)
