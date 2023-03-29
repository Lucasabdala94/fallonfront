export default function Pagination({arrayPage,setPage,page}){

    return (
        arrayPage.map(numPage => <button
            onClick={() => setPage(numPage)}
            className={numPage !== page ? "buton-pagination" : "button-pagination-select"}
            key={numPage + 2000000000000}>
            {numPage}
        </button>
        )
    )
}