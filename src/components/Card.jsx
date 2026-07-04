import React from 'react'

const Card = ({title,desc,tags}) => {
  return (
    <div className='card'>
      <div className="title">{title}</div>
      <div className="desc">{desc}</div>
      <div className='tags'>
        {tags.map((t)=><div className="tag" key={t}>{t}</div>)}
      </div>
    </div>
  )
}

export default Card