<template>
  <v-container class="" fluid>
    <v-btn @click="test()" > test</v-btn>
    <v-card class="pa-5">
      <!-- title -->
      <v-card-title>
        <div class="text-h5">Gestion d'utilisateurs et d'administrateurs</div>
      </v-card-title>
      <!-- search -->
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Rechercher"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <!-- data table -->
      <v-data-table
        :headers="headers"
        :items="users"
        :search="search"
        class="elevation-1"
      >
        <!-- town column -->
        <template v-slot:[`item.town`]="{ item }">
          <span>{{ item.town }}, {{ getTownName(item.town) }} </span>
        </template>

        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px" persistent>
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Nouveau Séliste
              </v-btn>
            </template>
            <!-- form -->
            <v-card>
              <v-card-title>
                <div class="text-h5">Créer/modifier un Séliste</div>
              </v-card-title>
              <v-card-text>
                <v-form ref="userForm">
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.surname"
                        label="Nom"
                        prepend-icon="mdi-account"
                        :rules="nameRules"
                        required
                        outlined dense
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.name"
                        label="Prénom"
                        prepend-icon="mdi-account"
                        :rules="nameRules"
                        required
                        outlined dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-autocomplete
                        v-model="editedItem.town"
                        :items="towns"
                        label="Ville - Code Postal"
                        prepend-icon="mdi-home-city"
                        :item-text="(item) => item.name + ', ' + item.value"
                        item-value="value"
                        :rules="townRules"
                        required
                        outlined dense
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.mail"
                        label="E-mail"
                        prepend-icon="mdi-email"
                        :rules="emailRules"
                        outlined dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row v-if="!EDIT_MODE">
                    <v-col>
                      <v-text-field
                        v-model="editedItem.password"
                        label="Mot de passe"
                        prepend-icon="mdi-lock"
                        :rules="passwordRules"
                        outlined dense
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-select
                        v-model="editedItem.admin"
                        :items="[
                          { text: 'OUI', value: true },
                          { text: 'NON', value: false },
                        ]"
                        item-text="text"
                        item-value="value"
                        label="Admin"
                        outlined dense
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.number"
                        label="Numéro"
                        prepend-icon="mdi-phone"
                        required
                        outlined dense
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="4">
                      <v-text-field
                        v-model="editedItem.credit"
                        label="Solde"
                        prepend-icon="mdi-phone"
                        :rules="onlyNumbersRules"
                        required
                        outlined dense
                        type="number"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <!-- actions -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Annuler
                </v-btn>
                <v-btn color="blue darken-1" text @click="save">
                  Enregistrer
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <!-- delete dialog -->
          <v-dialog v-model="deleteDialog" max-width="500px">
            <v-card>
              <v-card-title class="text-h10"
                >Vous êtes sûr de vouloir supprimer l'utilisateur
                ?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Annuler</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >OUI</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </template>
        <!-- actions -->
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
import { getUsers } from "../services/user";
import { saveAuthUser, deleteAuthUser,getCurrentAuthManagerUser } from "../services/auth";

export default {
  name: "UserManager",
  data() {
    return {
      EDIT_MODE: false,
      CREATE_MODE: false,
      users: [],
      //towns: towns, is from mixins
      search: "",
      headers: [
        { text: "Nom", value: "surname" },
        { text: "Prénom", value: "name" },
        { text: "Mail", value: "mail" },
        { text: "Numéro", value: "number" },
        { text: "Ville", value: "town" },
        { text: "Inscription", value: "updatedAt" },
        { text: "Création OK", value: "created"},
        { text: "Mail validé", value: "mailVerified"},
        { text: "Crédit", value: "credit" },
        { text: "Actions", value: "actions", sortable: false },
      ],
      editedItem: {
        id: null,
        firebaseID: "",
        idToken: "",
        name: "",
        surname: "",
        //adresse: "",
        town: null,
        number: "",
        mail: "",
        password: "",
        credit: "",
        admin: false,
      },
      defaultItem: {
        id: null,
        firebaseID: "",
        idToken: "",
        name: "",
        surname: "",
        //adresse: "",
        town: null,
        number: "",
        mail: "",
        password: "",
        credit: "",
        admin: false,
      },
      backupItem: {},
      itemToDelete: {},
      dialog: false,
      deleteDialog: false,
      editedIndex: -1,
    };
  },
  methods: {
    async loadUsers() {
      let items = await getUsers();
      console.log("feed users", items.data);
      this.users = items.data;
    },
    async save() {
      if (!this.$refs.userForm.validate()) {
        return;
      }
      console.log("this.editedItem", this.editedItem);

      try {
        // pass backup to compare mail changes for updating
        await saveAuthUser(this.editedItem, this.backupItem);
      } catch (err) {
        console.log("UserManager.save err", err);
      }
      // 0766445500
      await this.loadUsers();

      this.EDIT_MODE = false;
      this.CREATE_MODE = false;
      this.close();
    },
    // UPDATE
    editItem(item) {
      // backup
      this.backupItem = { ...item };
      console.log("editItem.item", item);
      //console.log("backup.item", this.actualItemBackup);

      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.EDIT_MODE = true;
      this.dialog = true;
    },
    // DELETE
    deleteItem(item) {
      console.log("deleteItem.item", item);
      this.itemToDelete = item;
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.deleteDialog = true;
    },
    async deleteItemConfirm() {
      try {
        await deleteAuthUser(this.itemToDelete);
      } catch (err) {
        console.log(err);
      }

      await this.loadUsers();

      this.itemToDelete = {};
      this.closeDelete();
    },
    close() {
      this.EDIT_MODE = false;
      this.CREATE_MODE = false;
      this.dialog = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
    },
    closeDelete() {
      this.deleteDialog = false;
      this.close();
    },
    test() {
      let user = getCurrentAuthManagerUser()
      console.log("AuthManager.currentUser", user)
    }
  },
  async mounted() {
    console.log("UserManager.towns", this.towns)
    await this.loadUsers()
  },
};
</script>