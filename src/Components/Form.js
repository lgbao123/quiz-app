import React, { useState } from 'react';
// class Form extends React.Component {
//     state = {
//         name: 'Bao',
//         point: 19
//     }
//     handleChangeName(e) {
//         this.setState({
//             name: e.target.value
//         })
//     }
//     handleChangeAge(e) {
//         this.setState({
//             point: e.target.value
//         })
//     }
//     handleOnSubmit(e) {
//         e.preventDefault()
//         this.props.getUser({
//             id: Math.random() + 'rand',
//             name: this.state.name,
//             point: this.state.point
//         })
//         // console.log(this.state)

//     }
//     render() {
//         return (
//             <>
//                 <form onSubmit={(e) => this.handleOnSubmit(e)}>

//                     <div>Hello {this.state.name}</div>
//                     <div>Point : {this.state.point}</div>
//                     <input onChange={(e) => this.handleChangeName(e)} value={this.state.name} />
//                     <input onChange={(e) => this.handleChangeAge(e)} value={this.state.point} />
//                     <button >Click me </button>

//                 </form>

//             </>
//         )
//     }
// }
const Form = (props) => {
    const [name, setName] = useState('Test');
    const [point, setPoint] = useState('123');
    const handleChangeName = (e) => {
        setName(e.target.value);
    }
    const handleChangePoint = (e) => {
        setPoint(e.target.value);
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        props.getUser({
            id: Math.random() + 'rand',
            name,
            point
        });
    }
    return (
        <>
            <form onSubmit={(e) => handleOnSubmit(e)}>
                <div>Name : {name}</div>
                <input onChange={(e) => handleChangeName(e)} value={name} />
                <div>Point : {point}</div>
                <input onChange={(e) => handleChangePoint(e)} value={point} />
                <button >Click me </button>
            </form>

        </>
    )
}
export default Form