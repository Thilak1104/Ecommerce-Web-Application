import React from 'react'
import Layout from './../components/Layout/Layout'
import { useSearch } from '../context/search'

const Search = () => {
    const [values,setValues] = useSearch();
  return (
    <Layout>
      <div className="container">
        <div className="text-center">
            <h1>Search Results</h1>
            <h6>{values?.results.length< 1 ? "No product found" : `Found ${values?.results.length}`}</h6>
            <div className="d-flex flex-wrap ">
            {values?.results.map((p) => (
              <div key={p._id} className="card m-2 style={{width: 18rem}} ">
                <img
                  src={`/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}              />
                <div className="card-body  ">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">{p.description.substring(0, 30)}</p>
                  <p className="card-text"> $ {p.price}</p>
                  <button type="btn" className="btn btn-primary ms-1">
                    More Details
                  </button>
                  <button type="btn" className="btn btn-secondary ms-1">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Search
