import React from 'react';
class Bai24 extends React.Component {
    state = {
        name: 'Bao',
        age: 19
    }
    handleCLickMe() {
        console.log(this) // this ở đây là 'undefined'
    }
    handleCLickMe2() {
        console.log(this) // this ở đây là 'Bai24' - Dùng để tránh lỗi
        // Trường hợp dùng class thì lưu ý điều trên khi sang hook thì sẽ không còn dùng từ khoá 'this' nữa 
    }
    render() {
        return (
            <>
                <div>Hello {this.state.name}</div>

                <button onClick={'console.log("123123")'}>Click me </button>
                <button onClick={() => this.handleCLickMe2()}>Click me 2  </button>
            </>
        )
    }
}
export default Bai24