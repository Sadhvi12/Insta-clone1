import React,{useState,useContext,} from 'react';
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import M from 'materialize-css'


const SignIn =()=>{
    const {state,dispatch} = useContext(UserContext)
    const history =useHistory()
    const [password,SetPassword] = useState("")
    const [email,SetEmail] = useState("")
    const PostData =()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Invalid email",classes:"#d32f2f red darken-2"})
            return
        }
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
            if(data.error){
                M.toast({html: data.error,classes:"#d32f2f red darken-2"})
            }
            else{
                localStorage.setItem("jwt",data.token)
                localStorage.setItem("user",JSON.stringify(data.user))
                dispatch({type:"USER",payload:data.user})
                M.toast({html:"signedin sucessfully",classes:"#388e3c green darken-2"})
                history.push('/')
            }
        }).catch(err=>{
            console.log(err)
        })
        
    }
    return (
        <div className="mycard">
            <div className="card auth-card input-field">
                <h2>Instagram</h2>
                <input
                type="text"
                placeholder="email"
                value={email}
                onChange={(e)=>SetEmail(e.target.value)}
                />
                <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e)=>SetPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #64b5f6 blue darken" 
                onClick={()=>PostData()}
                >login
                </button>
                <h5>
                    <Link to="/Signup">Don't have an account</Link>
                </h5>

            </div>
        </div>
    )
}

export default SignIn;