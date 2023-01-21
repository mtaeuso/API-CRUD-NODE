const { Router } = require('express')
const Person = require ('../models/Person')
const router = require ('express').Router()


//create data

router.post('/', async (req, res) => {
    
    //req.body
    const {name, salary, approved} = req.body
   
    //validação de teste
   if (!name) {
        res.status(422).json({error: 'o nome é obrigatorio!'})
        return
   }

    const person = {
        name,
        salary,
        approved,
    }

    try {
        await Person.create(person)
            res.status(201).json({message: 'pessoa inserida com sucesso! '})    //201 status http
    }  catch (error) {
            res.status(500).json({error: error})
    }
})

// read data 

    //todos os dados
router.get('/', async (req, res) => {
    try{
        const people = await Person.find()
            res.status(200).json(people)
    } catch (error) {
           res.status(500).json({error: error})
    }
})
// dados por id 

router.get('/:id', async (req, res) => {
    //extrair os dados  da requisição
    const id = req.params.id
    try {
        const person = await Person.findOne({_id: id })
        if (!person) {
            res.status(422).json({ message: 'O usuario não foi encontrado' })
        }
        res.status(200).json(person)
    } catch (error) {
        res.status(500).json({error: error})
    }
})

// update  (PUT AND PATCH)

router.patch('/person/:id', async (req, res) => {
    const id = req.params.id
  
    const { name, salary, approved } = req.body
  
    const person = {
      name,
      salary,
      approved,
    }
  
    try {
      const updatedPerson = await Person.updateOne({ _id: id }, person)
  
      if (updatedPerson.matchedCount === 0) {
        res.status(422).json({ message: 'Usuário não encontrado!' })
        return
      }
  
      res.status(200).json(person)
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })


  router.delete('/person/:id', async (req, res) => {
    const id = req.params.id
  
    const person = await Person.findOne({ _id: id })
  
    if (!person) {
      res.status(422).json({ message: 'Usuário não encontrado!' })
      return
    }
  
    try {
      await Person.deleteOne({ _id: id })
  
      res.status(200).json({ message: 'Usuário removido com sucesso!' })
    } catch (error) {
      res.status(500).json({ erro: error })
    }
  })


module.exports = router

  

