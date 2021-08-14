<template>
  <section>
    <h1>Edit note</h1>
    <hr/><br/>

    <form @submit.prevent="submit">
      <div class="mb-3">
        <label for="title" class="form-label">Title:</label>
        <input type="text" name="title" v-model="form.title" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="content" class="form-label">Content:</label>
        <textarea
          name="content"
          v-model="form.content"
          class="form-control"
        ></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </section>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'EditNote',
  props: ['id'],
  data() {
    return {
      form: {
        title: '',
        content: '',
      },
    };
  },
  created: function() {
    this.GetNote();
  },
  computed: {
    ...mapGetters({ note: 'stateNote' }),
  },
  methods: {
    ...mapActions(['updateNote', 'viewNote']),
    async submit() {
    try {
      let note = {
        id: this.id,
        form: this.form,
      };
      await this.updateNote(note);
      this.$router.push({name: 'Note', params:{id: this.note.id}});
    } catch (error) {
      console.log(error);
    }
    },
    async GetNote() {
      try {
        await this.viewNote(this.id);
        this.form.title = this.note.title;
        this.form.content = this.note.content;
      } catch (error) {
        console.error(error);
        this.$router.push('/dashboard');
      }
    }
  },
};
</script>
