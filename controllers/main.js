//MAIN.JS


//GET FUNCTION
const getTableData = (req, res, db) => {
    db.select('1').from('users')
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'RICHARD - no data!!!'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error RICHARD THIS IS A SELECT DB ERROR'}))
  }
  
  //POST FUNCTION
  const postTableData = (req, res, db) => {
    const { user_id, first_name, last_name, email, city, zipcode, address, registration_date, phone } = req.body
    const added = new Date()
    db('users').insert({user_id, first_name, last_name, email, city, zipcode, address, registration_date, phone, added})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error RICHARD THIS IS A POST DB ERROR'}))
  }
  
  //PUT FUNCTION
  const putTableData = (req, res, db) => {
    const { user_id, first_name, last_name, email, city, zipcode, address, registration_date, phone } = req.body
    db('users').where({id}).update({user_id, first_name, last_name, email, city, zipcode, address, registration_date, phone})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error RICHARD THIS IS A PUT DB ERROR'}))
  }
  
  //DELETE FUNCTION
  const deleteTableData = (req, res, db) => {
    const { id } = req.body
    db('users').where({id}).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: 'db error RICHARD THIS IS A DELETE DB ERROR'}))
  }
  
  module.exports = {
    getTableData,
    postTableData,
    putTableData,
    deleteTableData
  }