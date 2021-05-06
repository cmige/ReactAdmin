import React, { Component } from 'react'
import LinkButton from '../link-button'
import { Button } from "antd";

export default class Lazy extends Component{
    constructor(props){
        super(props)
        this.state = {
            props:props
        }

    }
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.selectRole_id) return true
        if (nextProps.updateItem) return true
        if (nextProps.toString() === this.props.toString()) return false
        return true
    }

    handleClick = async () => {
        const Com = await this.props.onload(this.props)
        // console.log(Com.default)
        this.props.onClick(Com.default)
    }
    render() {
        if (this.props.buttonType === 'Button') {
            return <Button
                type='primary'
                style={this.props.style}
                onClick={()=> this.handleClick(this.props) }
                disabled={this.props.buttonName === 'setRole'? !this.props.selectRole_id :''}
            >{ this.props.content }</Button>
        }
        return <LinkButton type='primary' style={this.props.style} onClick={()=> this.handleClick(this.props) }>{ this.props.content }</LinkButton>
    }
}