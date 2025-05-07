import React from 'react'

const ContainerType1 = ({ children, style, className = "" }) => {
  return (
    <div
      className={`container mb-3 py-3 app-bg-pallette-1 rounded ${className}`}
      style={{ color: "var(--pallette-3)", ...style }}
    >
      {children}
    </div>
  )
}

export default ContainerType1



