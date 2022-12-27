import React, { useState } from 'react';
import DisplayUser from './DisplayUser';
import Form from './Form'
/*
class MyComponent extends React.Component{
    state = {
        users : [
            {id :0 , name : "a" , point : "10"},
            {id :1 , name : "b" , point : "5"},
            {id :2 , name : "c" , point : "9"}
        ]
    }
    getUser= (user)=>{ // Dùng arrow function thì this ở đây sẽ là MyComponent , còn ko this sẻ là getUser
                        // <Form getUser = {this.getUser} /> nếu ở đây ko dùng arrow thì ở trên phải dùng , nếu trường hợp dùng ỡ đây 
                        // thì ko thể pass param (user) từ con lên cha được 
        this.setState({
            users : [user ,...this.state.users]
        })
    }
    deleteUser = (userid)=> {
        
        let users_clone = [...this.state.users]
        users_clone =users_clone.filter((item)=>{
            return item.id !== userid
        })
        this.setState({
            users : users_clone
        })
    }
    render(){
        return (
            <>
                <Form getUser = {this.getUser}  />
                <DisplayUser users = {this.state.users} deleteUser ={this.deleteUser}/>
            </>
        )
    }
}
*/
const MyComponent = () => {
    const [users, setUsers] = useState([
        { id: 0, name: "a", point: "10" },
        { id: 1, name: "b", point: "5" },
        { id: 2, name: "c", point: "9" }
    ]);
    const getUser = (user) => {
        setUsers([user, ...users]);
    }
    const deleteUser = (userid) => {
        let usersClone = [...users];
        usersClone = usersClone.filter((item) => {
            return item.id !== userid
        });
        setUsers(usersClone);

    }
    return (
        <>
            <Form getUser={getUser} />
            <DisplayUser users={users} deleteUser={deleteUser} />
        </>
    )
}
export default MyComponent