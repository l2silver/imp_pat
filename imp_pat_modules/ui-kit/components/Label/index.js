// @flow
import React, {PureComponent} from 'react'
import classnames from 'classnames'
type $props = {
    text: string,
    name?: string
}
export class Label extends PureComponent {
    props: $props;
    render(){
        const {text, name} = this.props
        return <span className={classnames('label', `label-${name || 'default'}`)}>{text}</span>
    }
}