<script lang="ts">
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  let greetings = "";

  if (currentHour < 12) greetings = "Buenos dias";
  else if (currentHour < 18) greetings = "Buenas tardes";
  else greetings = "Buenas noches";
</script>

<h1 class="font-bold text-3xl">{greetings}</h1>
