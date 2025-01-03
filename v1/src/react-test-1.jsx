import { Component, createRef, forwardRef } from "react";

import PropTypes from 'prop-types';

const BaseTextArea = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return <textarea ref={ref} {...rest} />;
});

BaseTextArea.displayName = 'BaseTextArea';

BaseTextArea.propTypes = {
  className: PropTypes.string,
};

export class Editor extends Component {
  constructor(props) {
    super(props)
    this.textAreaRef = createRef()
    this.state = {
      anagramCount: 0
    }
  }

  handleClickButton1 = () => {
    if (this.textAreaRef.current) {
      this.textAreaRef.current.value = ''
      this.setState({ anagramCount: 0 })
    }
  }

  handleClickButton2 = () => {
    if (this.textAreaRef.current) {
      const text = this.textAreaRef.current.value
      const words = text.trim().split(' ')
      const group = {}

      words.forEach((word) => {
        const sortedWord = word.split('').sort().join('')
        if (group[sortedWord]) {
          group[sortedWord]++
        } else {
          group[sortedWord] = 1
        }
      })

      const anagramCount = Object.values(group).filter((count) => count > 1).length

      this.setState({ anagramCount })
    }
  }

  render() {
    const { anagramCount } = this.state

    return (
      <div>
        <BaseTextArea ref={this.textAreaRef} placeholder='텍스트를 입력하세요.' />
        <button onClick={this.handleClickButton1}>버튼 1</button>
        <button onClick={this.handleClickButton2}>버튼 2</button>
        <div>애너그램 수: {anagramCount}</div>
      </div>
    )
  }
}