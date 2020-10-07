const arrOfPromises = []
const makeRequest = obj => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(obj.id)
      if (obj.id % 10 === 0) {
        reject(`FAIL ${obj.id}`)
      } else {
        resolve()
      }
    }, 5000)
  })
}

for (let i = 0; i < 100; i++) {
  arrOfPromises.push(() => makeRequest({ id: i }))
}

const limitParallel = (tasks, limit) => {
  return new Promise((resolve) => {
    let tasksToFinish = tasks.length
    limit = tasks.length > limit ? limit : tasks.length

    for (let i = 0; i < limit; i++) {
      tasks.shift()().then(() => taskRunner()).catch(err => taskRunner(err))
    }

    const taskRunner = async error => {
      tasksToFinish--

      if (error) console.log(error)

      if (tasks.length > 0) {
        const nextTask = tasks.shift()

        try {
          await nextTask()

          taskRunner()
        } catch (err) {
          taskRunner(err)
        }
      }

      if (tasksToFinish === 0) return resolve()
    }
  })
}

limitParallel(arrOfPromises, 50).then(() => console.log('FINISH'))
