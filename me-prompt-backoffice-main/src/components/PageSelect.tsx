import React from 'react';
import { Pagination, Form } from 'react-bootstrap';
interface PageSelectProps {
    page: number;
    totalPages: number;
    onChangePage: (size: number) => void;
    onChangePageSize: (size: number) => void;
}
const PageSelect: React.FC<PageSelectProps> = ({ page, totalPages, onChangePage, onChangePageSize }) => {
    let paginationItems = [];

    let start = page - 2;
    let end = page + 2;

    // Adjust the start and end values when they're out of bounds
    if (start < 1) {
        end += (1 - start);
        start = 1;
    }
    if (end > totalPages) {
        start -= (end - totalPages);
        end = totalPages;
    }

    // Generate the range of numbers
    for (let i = start; i <= end; i++) {
        if (i > 0) {
            paginationItems.push(
                <Pagination.Item key={'page-' + i} active={i === page} onClick={() => onChangePage(i)}>
                    {i}
                </Pagination.Item>
            );
        }
    }
    return (
        <div className='space-between'>
            <Pagination className='mb-0'>
                <Pagination.First onClick={() => onChangePage(1)} disabled={page === 1} />
                <Pagination.Prev onClick={() => onChangePage(page - 1)} disabled={page === 1} />
                {paginationItems}
                <Pagination.Next onClick={() => onChangePage(page + 1)} disabled={page === totalPages} />
                <Pagination.Last onClick={() => onChangePage(totalPages)} disabled={page === totalPages} />
            </Pagination>
            <Form.Select
                className='page-show-list'
                aria-label="Default select example"
                onChange={(e) => onChangePageSize(Number(e.target.value))}
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="300">300</option>
                <option value="500">500</option>
                <option value="1000">1000</option>
            </Form.Select>
        </div>
    );
}

export default PageSelect;
