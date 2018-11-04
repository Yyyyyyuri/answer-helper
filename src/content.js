async function sleep (timeout) {
  return new Promise((resolve) => setTimeout(() => resolve(), timeout))
}

function findAnswer () {
  const content = document.getElementsByClassName('Barrage-main')[0].innerText.toUpperCase()
  const answerContent = content.replace(/[^ABC]/g, '')
  const statistic = { A: 0, B: 0, C: 0 }
  answerContent.split('').map(c => ++ statistic[c])
  return Object.entries(statistic).sort((a, b) => b[1] - a[1])[0][0]
}

async function main_loop (ans) {
  console.log('main_loop started')

  let state = 'IDLE'
  while (true) {
    if (state === 'IDLE') {
      const preview = document.getElementsByClassName('answerPreview-43abcd')
      console.log('IDLE')
      if (preview && preview.length > 0) {
        console.log('prepare to answer the problem')
        state = 'READY'
      }
    } else if(state === 'READY') {
      const elems = document.querySelectorAll("div[class^='answerProblem'] ul li");
      if (elems && elems.length > 0) {
        const answer = ans ? ans : findAnswer()
        console.log('answer: ', answer)
        for (let i = 0; i < 20; ++i) {
          try {
            if (answer === 'A') {
              elems[0].click()
            } else if (answer === 'B') {
              elems[1].click()
            } else if (answer === 'C') {
              elems[2].click()
            }
          } catch (e) {
            // do nothing
          }
          
          await sleep(20)
        }
        await sleep(1000)
        state = 'IDLE'
        
        setTimeout(() => window.location.reload(), 18 * 60 * 1000)
      }
    }

    await sleep(state === 'IDLE' ? 5000 : 50)
  }
}

main_loop()
