import React from 'react'
import { Card } from 'react-bootstrap'
import { FaEdit, FaPaperPlane, FaPlus } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function DpoDownloadTemplateForm() {
  return (
    <main className="pt-3">
      <div className="container-fluid">
        <div className="row mt-5">
          <div className="col-md-12 mb-3">
            <div className="card bg-white">
              <div className="card-header">
                <h4 className='title-clr'>
                  <i className="bi bi-table me-2"></i> Download Template
                </h4>
              </div>
              <div className="card-body">
                <div className="row justify-content-center p-3">
                  <div className="col-md-5 mt-3">
                    <Card className='p-5 bg-gray'>
                  <h6><Link to="/" ><FaPlus />&nbsp;&nbsp; Add profile </Link></h6>
                  <br></br>
                  <h6><Link to="/" ><FaEdit />&nbsp;&nbsp;Edit / Delete </Link></h6></Card>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DpoDownloadTemplateForm