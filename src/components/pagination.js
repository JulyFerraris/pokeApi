import React from 'react'
import './pagination.css'

const Pagination = (props) => {

   return (
      <div className="pagination">
         { props.offset !== 0 ?
            <button onClick={props.prevPage} type="button" className="pagination__button">&larr;</button>
         : null}
         <button onClick={props.nextPage} type="button" className="pagination__button">&rarr;</button>
      </div>
         
   )
}

export default Pagination;