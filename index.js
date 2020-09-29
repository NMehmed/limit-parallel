const arrOfPromises = []
const makeRequest = obj => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(obj.id)
      resolve()
    }, 500)
  })
}

for (let i = 0; i < 100; i++) {
  arrOfPromises.push(() => makeRequest({ id: i }))
}

const limitParallel = (tasks, limit) => {
  return new Promise((resolve) => {
    let tasksToFinish = tasks.length
    limit = tasks.length > limit ? limit : tasks.length

    const taskRunner = (isInitial = false, error) => {
      if (isInitial) {
        for (let i = 0; i < limit; i++) {
          tasks.shift()().then(() => taskRunner()).catch(err => taskRunner(false, err))
        }
      } else {
        tasksToFinish--

        if (tasks.length > 0) {
          tasks.shift()().then(() => taskRunner()).catch(err => taskRunner(false, err))
        }

        if (error) console.log(error)

        if (tasksToFinish === 0) return resolve()
      }
    }

    taskRunner(true)
  })
}

limitParallel(arrOfPromises, 50).then(() => console.log('FINISH'))
