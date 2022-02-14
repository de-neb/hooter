<template>
  <div class="container p-0">
    <header class="home-header">
      <nav class="navbar navbar-expand-lg navbar-light p-0">
        <div class="container-sm justify-content-evenly h-100">
          <div class="row w-100 align-items-center">
            <div class="col text-start p-0 my-2">
              <div class="profile-icon">
                <h6 class="uname-first-letter">P</h6>
              </div>
            </div>
            <div class="col-9 p-0 my-2">
              <h6 class="my-2 text-start fw-bold">Home</h6>
            </div>
            <div class="col p-0 position-relative h-100 my-2">
              <span class="material-icons-outlined sparkle">
                auto_awesome
              </span>
            </div>
          </div>
        </div>
      </nav>
    </header>
    <main class="flex-grow-1">
      <div class="filler"></div>
      <h1>some content...</h1>
      <img src="../assets/bg-hooter.png" alt="" class="img-fluid" />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ex ducimus
        nihil atque. Dolor maxime laudantium provident, voluptatum placeat ab
        excepturi perspiciatis, obcaecati facilis incidunt minima mollitia!
        Exercitationem ullam magni laborum ut nostrum obcaecati nesciunt!
        Placeat, beatae error? Temporibus labore iure similique nihil odio
        facilis maxime perspiciatis, eum quia sunt voluptatibus nostrum pariatur
        optio necessitatibus! Perferendis recusandae adipisci at, rerum
        molestias autem earum! Numquam quos optio at id quis sunt praesentium
        nobis cumque velit corporis error magnam corrupti, hic sapiente
        assumenda quas obcaecati iure soluta commodi eos neque sit quasi
        nostrum! Nostrum reprehenderit assumenda necessitatibus eius et,
        laboriosam pariatur dicta. Sed voluptas aut, debitis quaerat impedit
        voluptatum porro. Quam iusto omnis exercitationem, architecto expedita
        mollitia, quaerat dicta, aspernatur quo similique fugiat! Nihil
        similique ea voluptate iste. Blanditiis atque illum nam! Molestiae,
        eligendi veniam! Assumenda officia repellendus fugiat ipsa eos
        consequuntur vitae consectetur eligendi quae maiores blanditiis nulla,
        voluptates molestiae officiis perferendis molestias, sapiente nihil
        labore quaerat dolores temporibus. Saepe magnam quisquam placeat cumque
        laudantium. Rerum et cumque delectus neque a? Doloribus, dicta? Porro,
        suscipit eaque? Repellendus quidem laboriosam qui maiores, aliquam
        aliquid iusto vitae impedit rem soluta repellat recusandae aperiam
        facilis molestiae sit pariatur id asperiores rerum? Ea commodi
        recusandae voluptates est aspernatur ducimus saepe. Distinctio provident
        sed sapiente fugit, molestias dolore quidem facilis. Odio iste similique
        at facere? Cum obcaecati, enim magni, non saepe iure, ex facere ducimus
        dicta unde recusandae labore et magnam aperiam nisi aspernatur amet!
        Earum dignissimos fugit labore vitae nostrum cum eum eligendi quidem,
        vero sed. Repellat, labore? Aut in, alias natus architecto libero minus
        excepturi incidunt fugit odio repudiandae dolorem eum nostrum, eveniet
        modi. Maiores, explicabo qui soluta consectetur recusandae minima
        officia quis. Perferendis hic, quia nam, nostrum architecto dignissimos
        recusandae est, corporis et nesciunt itaque delectus? Suscipit
        laudantium, nobis cum consectetur labore libero tempore.
      </p>
      <div class="filler"></div>
    </main>
    <footer class="home-footer">
      <nav class="container p-0">
        <ul class="row flex-nowrap list-unstyled m-0">
          <li
            class="col h-100 my-2"
            v-for="(page, i) in footerPages"
            :key="page.name + '-' + i"
          >
            <router-link
              :to="page.link"
              class="text-dark position-relative h-100"
            >
              <span class="icons-bg-circle" :class="iconClass(page.link)">
                {{ page.name }}
              </span>
            </router-link>
          </li>
        </ul>
      </nav>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      footerPages: [
        {
          name: "home",
          link: "/home",
        },
        {
          name: "search",
          link: "/explore",
        },
        {
          name: "notifications",
          link: "/notifications",
        },
        {
          name: "email",
          link: "/messages",
        },
      ],
      isActive: false,
    };
  },
  methods: {
    iconClass(link) {
      if (this.$route.path === link && link === "/explore") {
        return "material-icons fw-bold";
      } else if (this.$route.path === link) {
        return "material-icons";
      }
      return "material-icons-outlined";
    },
  },
};
</script>

<style>
</style>