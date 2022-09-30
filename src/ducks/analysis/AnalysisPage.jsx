import React from 'react'
import { useLocation } from 'react-router-dom'
import AnalysisTabs from 'ducks/analysis/AnalysisTabs'
import useBreakpoints from 'cozy-ui/transpiled/react/hooks/useBreakpoints'

/**
 * Renders its children
 *
 * - On mobile, render the AnalysisTabs
 */
const AnalysisPage = ({ children }) => {
  const { isMobile } = useBreakpoints()
  const location = useLocation()
  return (
    <>
      {isMobile ? <AnalysisTabs location={location} /> : null}
      {children}
    </>
  )
}

export default AnalysisPage
