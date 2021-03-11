import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom'
import M from 'materialize-css'


const SignIn =()=>{
    const history =useHistory()
    const [name,SetName] = useState("")
    const [password,SetPassword] = useState("")
    const [email,SetEmail] = useState("")
    const PostData =()=>{
        // if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
        //     M.toast({html:"Invalid email",classes:"#d32f2f red darken-2"})
        //     return
        // }
        // if(!/[^A-Za-z0-9_'-]/.test(name)){
        //     M.toast({html:"Invalid name",classes:"#d32f2f red darken-2"})
        //     return 
        // }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
                M.toast({html: data.error,classes:"#d32f2f red darken-2"})
            }
            else if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
                M.toast({html:"Invalid email",classes:"#d32f2f red darken-2"})
                return
            }
            else{
                M.toast({html:data.message,classes:"#388e3c green darken-2"})
                history.push('/signin')
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
                placeholder="name"
                value={name}
                onChange={(e)=>SetName(e.target.value)}
                />
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
                >Signup
                </button>
                <h5>
                    <Link to="/SignIn">Already have an account</Link>
                </h5>

            </div>
        </div>
    )
}

export default SignIn;