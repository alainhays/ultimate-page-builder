import Vue, { util } from 'vue';
import store from '../../store'

import {sprintf} from 'sprintf-js'

// Section Contents
// import SectionContentsPanel from '../section/SectionContentsPanel.vue'
// Vue.component('section-contents-panel', SectionContentsPanel);

// Section Settings
// import SectionSettingsPanel from '../section/SectionSettingsPanel.vue'
// Vue.component('section-settings-panel', SectionSettingsPanel);

export default {

    name : 'row-list',

    props : ['index', 'model', 'selected'],

    data(){
        return {
            l10n       : store.l10n,
            breadcrumb : store.breadcrumb,
        }
    },

    computed : {
        parentShowChild(){
            return this.$parent.$data.showChild;
        }
    },

    methods : {

        activeFocus(){
            this.model._upb_options.focus = true;
        },
        removeFocus(){
            this.model._upb_options.focus = false;
        },

        contentsAction(id, tool){

            this.$emit('showContentsPanel')

            // console.log('OPEN CONTENTS PANEL')
            //this.breadcrumb.push(`${this.model.id}`)
        },

        settingsAction(id, tool){
            this.$emit('showSettingsPanel')

            // console.log('OPEN SETTINGS PANEL')
        },

        deleteAction(id, tool){
            if (confirm(sprintf(this.l10n.delete, this.model.attributes.title))) {
                this.$emit('deleteItem')
            }
        },

        cloneAction(id, tool){
            this.$emit('cloneItem');
        },

        enableAction(id, tool){
            this.model.attributes.enable = false;
        },

        disableAction(id, tool){
            this.model.attributes.enable = true;
        },

        clickActions(id, tool){
            if (this[`${id}Action`]) {
                this[`${id}Action`](id, tool)
            }
            else {
                util.warn(`You need to implement ${id}Action method.`, this);
            }
        },

        enabled(id){

            if (id == 'enable') {
                return this.model.attributes.enable;
            }

            if (id == 'disable') {
                return !this.model.attributes.enable;
            }

            return true;
        },

        toolsClass(id, tool){
            return tool['class'] ? `${id} ${tool['class']}` : `${id}`;
        },

        itemClass(){

            return [
                this.model.attributes.enable ? 'item-enabled' : 'item-disabled',
                this.model._upb_options.focus ? 'item-focused' : 'item-unfocused',
                (this.selected == this.index) ? 'item-selected' : '']
                .join(' ');
        },

        getContentPanel(id){
            return `${id}-contents-panel`;
        },

        getSettingPanel(id){
            return `${id}-settings-panel`;
        }
    }
}