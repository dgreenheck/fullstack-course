import React from "react"

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
)

const Header = (props) => {
  return <h1>{props.course.name}</h1>
}

const Content = ({ course }) => (
  course.parts.map(part =>
    <Part
      key={part.id}
      part={part}
    />
  )
)

const Part = (props) => <p>{props.part.name} {props.part.exercises}</p>

const Total = ({ course }) => {
  const total = course.parts.reduce((prev,curr) => prev + curr.exercises, 0)

  return <p className="total">Number of exercises {total}</p>
}

export default Course