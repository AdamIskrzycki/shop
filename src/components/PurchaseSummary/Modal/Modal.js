import React, {Component} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import './Modal.css';

class Modal extends Component {

    render() {
        return (
            <>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div
                    className="Modal" 
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)' ,
                        opacity: this.props.show ? '1' : '0'
                    }}>
                </div>
            </>
        );
    }
}

export default Modal;