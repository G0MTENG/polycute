# 1번째 과제
### Vanila JS (기초)
1. 구조 분해 할당에 대해 서술하시오.
배열이나 객체의 속성을 해제하여 그 값을 개별 변수에 담을 수 있게 하는 표현식입니다.

2. Opional Channing에 대해 서술하고 하위 호환성을 위해 어떻게 표기해야 하는지 서술하시오.
Optional Channing은 객체의 중첩된 속성에 접근할 때, 속성이 존재하지 않으면 undefined를 반환하는 연산자입니다.

하위 호환성을 위해 아래와 같이 표기해야 합니다.
```js
const name = obj && obj.user && obj.user.name
```


3. 빈 배열에 아래 일련의 과정을 거칠 경우, 배열에 담긴 내용을 작성하시오.

  - 1. push('a')
  -> ['a'], 1을 반환합니다.
  - 2. shift()
  -> [], 'a'를 반환합니다.
  - 3. unshift()
  -> ['a'], 1을 반환합니다.


4. Promise에 대해 서술하고, Promise를 사용할 때 주의할 점을 2가지 이상 서술하시오.

Promise는 비동기 작업의 성공 또는 실패를 처리하는 객체로 Pending, Fulfilled, Rejected 세 가지 상태를 가집니다.

Promise를 사용할 때 주의할 점은

1. 프로미스의 에러에 대해 핸들링을 해주어야 합니다.
2. .then(), .catch() 와 같은 메서드로 중첩하면 가독성이 떨어지고 복잡해질 수 있으므로 async/await 문법으로 작성하는 것이 좋습니다.
3. .then() 에서는 체이닝을 위해 Promise를 반환해야 합니다.

### React
1. 기초
className prop을 항상 제외하는 BaseTextArea 컴포넌트를 구현하시오.
- 부모 컴포넌트 (Editor)는 textarea를 ref로 참조해야 한다.
- 부모 컴포넌트는 버튼 2개와 BaseTextArea로 구성되어 있으며 React Hook을 사용하지 않는다.
- 버튼 1을 클릭하면 BaseTextArea에 입력한 값을 삭제해 주세요.
- 버튼 2클 클릭하면 BaseTextArea에 입력한 단어 중에 몇 개의 애너그램이 존재하는지 출력해 주세요.

```jsx
import { Component, createRef, forwardRef } from "react";

const BaseTextArea = forwardRef((props, ref) => {
  const { className, ...rest } = props;
  return <textarea ref={ref} {...rest} />;
})

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
```

2. 라이브러리 활용
마크다운을 파싱하기 위한 대표적인 라이브러리 marked가 있다

1. marked가 제공하는 renderer 옵션을 사용해서 H1, H2, H3 Heading에 anchor를 추가하시오.

2. 인용문을 클릭하면 인용문을 복사하는 기능을 추가하시오.

3. textarea에 작성한 마크다운 텍스트를 파싱해서 화면에 출력하시오.

```jsx
import { useState } from "react";
import { marked } from "marked";

const renderer = {
  heading(args) {
    const depth = args.depth;
    const text = this.parser.parseInline(args.tokens);

    if (depth > 3) {
      return `<h${depth}>${text}</h${depth}>`;
    }

    return `
            <h${depth}>
              <a name="${text}" class="anchor" href="#${text}">
                <span class="header-link">${text}</span>
              </a>
            </h${depth}>`;
  },

  blockquote(args) {
    const text = args.text
    
    return `<blockquote onClick="navigator.clipboard.writeText('${text}'); alert('클립보드에 복사되었습니다')">${text}</blockquote>`;
  },
}

marked.use({ renderer })

export const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState("");

  const handleChange = (event) => {
    setMarkdown(event.target.value);
  };

  return (
    <div>
      <textarea
        value={markdown}
        onChange={handleChange}
        placeholder="마크다운을 입력하세요."
      />
      <h3>마크다운 결과물</h3>
      <div
        className="output"
        dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
      ></div>
    </div>
  );
};
```

### 심화 (알고리즘)
주어진 그래프1 에서 임의의 노드로부터 시작하여 모든 간선을 한 번만 지나는 경로가 있는지 확인하고, 경로가 존재한다면 그 경로를 return하는 자바스크립트 함수를 작성하시오.
또한 경로가 존재하기 위한 조건이 무엇인지 설명하시오.

- ES6 이상 문법으로 작성할 것.
- 함수의 입력은 각 노드의 이웃 노드들을 나열한 인접 리스트 형태의 2차원 배열입니다.
- 모든 노드는 'A'부터 시작하는 문자입니다.

Ex )
[['A', 'B'], ['B', 'C'], ['B', 'D'], ['C', 'D']]
=> ['A', 'B', 'C', 'D', 'B']

경로가 존재히기 위한 조건
1. 모든 간선이 연결된 하나의 컴포넌트에 속해야 합니다.
2. 모든 노드의 차수가 짝수이거나, 두 노드의 차수가 홀수이고 나머지 노드는 모두 차수가 짝수입니다.

```js
const findPath = (edges) => {
  const graph = {}
  for (const [from, to] of edges) {
    if (!graph[from]) graph[from] = []
    if (!graph[to]) graph[to] = []
    graph[from].push(to)
    graph[to].push(from)
  }

  let oddNodes = []
  for (const node in graph) {
    if (graph[node].length % 2 === 1) {
      oddNodes.push(node)
    }
  }

  if (oddNodes.length !== 0 && oddNodes.length !== 2) return null

  const startNode = oddNodes.length === 2 ? oddNodes[0] : Object.keys(graph)[0]

  const path = []
  const visitedEdges = new Set()

  const dfs = (node) => {
    while (graph[node].length > 0) {
      const nextNode = graph[node].pop()
      const key1 = `${node}${nextNode}`
      const key2 = `${nextNode}${node}`
      if (!visitedEdges.has(key1) && !visitedEdges.has(key2)) {
        visitedEdges.add(key1)
        visitedEdges.add(key2)
        dfs(nextNode)
      }
    }
    path.push(node)
  }

  dfs(startNode)

  if (visitedEdges.size / 2 !== edges.length) {
    return null
  }

  return path.reverse()
}

// INPUT
// [['A', 'B'], ['B', 'C'], ['B', 'D'], ['C', 'D']]

// OUTPUT
// ['A', 'B', 'C', 'D', 'B']

const graph = [['A', 'B'], ['B', 'C'], ['B', 'D'], ['C', 'D']]
const path = findPath(graph)

if (path) {
  console.log(path) // [ 'A', 'B', 'D', 'C', 'B' ]
} else {
  console.log('경로를 찾을 수 없습니다.')
}
```