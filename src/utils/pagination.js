import React, { useState, useEffect } from 'react';
import { Pagination } from "react-bootstrap";
import IconNext from "../assets/images/Icon_next.svg";
import IconPrev from "../assets/images/Icon_prev.svg";

export const PaginationComp = (props) => {
    const [selected, setSelected] = useState(props.page);
    const [selectPageSize, setSelectedPageSize] = useState(props.pageSize);
    let pages = props.pages || (parseInt(Math.ceil(props.records / props.pageSize))) || 1;
    let fstart = selected - 4 <= 0 ? 1 : selected - 4;
    let send = selected + 4 > pages ? pages : selected + 4;
    let from = (selected - 1) * selectPageSize;
    const onPageChange = (pgno) => { setSelected(pgno); if (props.onChange) props.onChange(pgno) }
    const onPageSizeChange = (pgsize) => { setSelectedPageSize(pgsize); setSelected(1); if (props.onPageSizeChange) props.onPageSizeChange(pgsize) }

    useEffect(() => {
        pages = props.pages || (parseInt(Math.ceil(props.records / props.pageSize))) || 1;
    }, [props.records])

    return (<>
        {
            // this code is for show array with prev- next and page number

            /* <Pagination className="sr-pagination mt-4">
                <Pagination.First disabled={selected === 1} onClick={() => onPageChange(1)} />
                <Pagination.Prev disabled={selected === 1} onClick={() => onPageChange(selected - 1)} />
                {fstart > 1 && <Pagination.Ellipsis />}
                {pageSteps(fstart, selected, onPageChange)}
                <Pagination.Item key={selected} active>{selected}</Pagination.Item>
                {pageSteps(selected + 1, send + 1, onPageChange)}
                {send < pages && <Pagination.Ellipsis />}
                <Pagination.Next disabled={selected === pages} onClick={() => onPageChange(selected + 1)} />
                <Pagination.Last disabled={selected === pages} onClick={() => onPageChange(pages)} />
            </Pagination> */

        }

        {
            // this code is for show only arrow of prev and next
        }
        <div className='d-flex align-items-center justify-content-between justify-content-md-end custom-pagination'>
            <div className='select-per-pages d-flex align-items-center me-2 me-md-4'>
                <span className='total-pages m-0 me-1'>Rows per page:</span>
                <div className='position-relative'>
                    <select className='total-pages m-0' onChange={(e) => onPageSizeChange(e.target.value)}>
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                    <img src={IconPrev} className="page-dd" alt="Previous" />
                </div>
            </div>
            <div className='d-flex align-items-center mt-1'>
                <div className='d-flex align-items-center'>
                    <h4 className='total-pages mb-0'><span className='me-1'>{(selected === 1) ? 1 : (from + 1)} - {(selected !== pages) ? selectPageSize * selected : props.records}</span>of<span className='ms-1'>{props.records}</span></h4>
                </div>
                <div className='d-flex align-items-center prev-next-img'>
                    <Pagination.Prev className='d-flex c-pointer' disabled={selected === 1} onClick={() => onPageChange(selected - 1)}>
                        <img src={IconPrev} className="prev-page" alt="Previous" />
                    </Pagination.Prev>
                    <Pagination.Next className='d-flex ms-0 ms-md-4 c-pointer' disabled={selected === pages} onClick={() => onPageChange(selected + 1)}>
                        <img src={IconNext} className="next-page" alt="Next" />
                    </Pagination.Next>
                </div>
            </div>
        </div>
    </>
    )
}

const pageSteps = (start, end, onClick) => {
    let pageItem = [];
    for (let i = start; i < end; i++)
        pageItem.push(<Pagination.Item key={i} onClick={() => onClick(i)} >{i}</Pagination.Item>)
    return pageItem;
}