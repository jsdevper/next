import tw from 'tailwind-styled-components'

// h1 인데 밑줄 있는 h1
// export const h1underline = tw.h1`
//   text-3xl
//   font-bold
//   underline
// `

//무조건 대문자로 시작해야한다
export const Test = tw.h1`
  font-bold
  underline
`

export default function Home() {
  return (
    <>
      <Test>this is main page</Test>
    </>
  )
}
