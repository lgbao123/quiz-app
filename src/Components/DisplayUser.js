import React, { useState } from 'react';
import './DisplayUser.scss'
// class DisplayUser extends React.Component {
//     state = {
//         isShow: true
//     }
//     handleShowHide() {
//         this.setState({
//             isShow: !this.state.isShow
//         })
//     }
//     render() {
//         let { users } = this.props;

//         return (
//             <div className='display-user-container'>
//                 <button onClick={() => this.handleShowHide()}>{this.state.isShow === true ? 'Hide' : 'Show'}</button>
//                 {this.state.isShow &&
//                     (users.map((item) => {
//                         return (
//                             <div className={item.point > 8 ? 'green' : 'red'} key={Math.random()}>
//                                 {item.name} - {item.point}
//                                 <button onClick={() => this.props.deleteUser(item.id)}>Delete</button>
//                             </div>
//                         )
//                     }))
//                 }
//             </div>
//         )
//     }
// }
const DisplayUser = (props) => {
    let { users } = props;
    const [isShow, setIsShow] = useState(true)

    function handleShowHide() {
        setIsShow(!isShow)
    }
    return (
        <div className='display-user-container'>
            <button onClick={() => handleShowHide()}>{isShow === true ? 'Hide' : 'Show'}</button>
            {isShow &&
                (users.map((item) => {
                    return (
                        <div className={item.point > 8 ? 'green user' : 'red user'} key={Math.random()}>
                            <span>Name :{item.name} <br /> Point :{item.point}</span>
                            <button onClick={() => props.deleteUser(item.id)}>Delete</button>
                        </div>

                    )
                }))
            }
        </div>
    )

}
export default DisplayUser