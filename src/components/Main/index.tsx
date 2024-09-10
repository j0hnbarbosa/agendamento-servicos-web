import React from "react"

interface MainProps extends React.PropsWithChildren {
  
}

const Main: React.FC<MainProps> = ({ children }) => {
  return (
    <main>
      {children}
    </main>
  )
}

export default Main