import React from "react";

function SearchForm(){
    return(
        <div>
            <h3>Book Search</h3>
        
        <form>
            <div className="form-group">
                <label>Search</label>
                <input className="form-control" id="bookInput" placeholder="Search"/>
                
            </div>
            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
        </div>

    )
}

export default SearchForm