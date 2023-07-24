<script>
  import { fade } from 'svelte/transition'

  const n = Number(prompt('size of box:', '10'))
  const start = prompt('start pos', '3 3').split(' ').map(i => Number(i))
  const target = prompt('target pos', '9 9').split(' ').map(i => Number(i))

  let map = [...Array(n)].map(i => Array(n).fill(' '))

  let container
  $: if(container){
    container.style.gridTemplateColumns = `repeat(${n}, 1fr)`
  }

  map[target[0]-1][target[1]-1] = 'T'

  var stack = []
  stack.push([start[0]-1, start[1]-1])

  const loop = () => {
    setTimeout(async () => {

      const [x, y] = stack.shift()
      console.log(x, y)

      if(map[x][y] == 'T'){
        alert('found')
        return
      }

      if(map[x][y] == 'V'){
        loop()
        return
      }

      map[x][y] = 'V'

      if(x+1 < n){
        stack.push([x+1, y])
      }

      if(x-1 >= 0){
        stack.push([x-1, y])        
      }

      if(y+1 < n){
        stack.push([x, y+1])        
      }

      if(y-1 >= 0){
        stack.push([x, y-1])
      }

      if(stack.length > 0){
        loop()
      }

    }, 50)
  }

  loop()

</script>

<div class="h-100vh w-full flex justify-center items-center">
  <div class="bg-gray-300 grid gap-1 p-1 h-full aspect-1 box-border" bind:this={container}>
    {#each map as row}
      {#each row as item}
        <div class="aspect-1 rounded bg-white overflow-hidden">
          {#if item == 'S'}
            <div class="w-full h-full bg-green-100"></div>
          {:else if item == 'T'}
            <div class="w-full h-full bg-red-100"></div>
          {:else if item == 'V'}
            <div class="w-full h-full bg-lime-100" in:fade></div>
          {/if}
        </div>
      {/each}
    {/each}
  </div>
</div>