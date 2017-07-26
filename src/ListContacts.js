import React, {Component} from "react";
import PropTypes from 'prop-types';
import escapeRegExp from 'escape-string-regexp';
import sortby from 'sort-by';
import {Link} from "react-router-dom";

class ListContacts extends Component{
    static propTypes={
        contacts: PropTypes.array.isRequired,
        onDeleteContact: PropTypes.func.isRequired
    };
    state = {
        query: ''
    };
    updateQuery = (query) => {
        this.setState({query: query.trim()})
    };

    clearQuery = () => {
        this.setState({query: ''})
    };

    render(){
        let showingContacts;
        if(this.state.query){
            const match = new RegExp(escapeRegExp(this.state.query), 'i');
            showingContacts = this.props.contacts.filter((contact) => match.test(contact.name))
        } else {
            showingContacts = this.props.contacts;
        }

        showingContacts.sort(sortby('name'));
        const { contacts, onDeleteContact } = this.props;
        const { query } = this.state;
        return(
            <div className="list-contacts">
                <div className="list-contacts-top">
                    <input className="search-contacts"
                           type="text"
                           placeholder="Search Contacts"
                           value={query}
                           onChange={(event) => this.updateQuery(event.target.value)}/>
                    <Link
                        to='/create'
                       className='add-contact'
                             >Add Contact</Link></div>
                {showingContacts.length !== contacts.length && (
                    <div className="showing-contacts">
                        <span>Now Showing {showingContacts.length} of {contacts.length} total
                            <button onClick={this.clearQuery}>Show all</button>
                        </span>
                    </div>
                )}
            <ol className="contact-list">
                {showingContacts.map((contact) => (
                    <li key={contact.id} className="contact-list-item">
                        <div className="contact-avatar" style={{backgroundImage: `url(${contact.avatarURL}`}}></div>
                        <div className="contact-details">
                            <p>{contact.name}</p>
                            <p>{contact.details}</p>
                        </div>
                        <button onClick={()=> onDeleteContact(contact)} className="contact-remove">Remove</button>
                    </li>
                ))}
            </ol>
            </div>
        )
    }

}

export default ListContacts