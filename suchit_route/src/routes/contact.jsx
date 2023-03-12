import { Form, useLoaderData } from  "react-router-dom";
import { getContact } from "../contacts";


export async function loader({ params }) {
    const contact = await getContact(params.contactId);
    return { contact };
  }

  
export default function Contact() {
      const { contact } = useLoaderData();


    // const contact = {
    //     first: "Suchit",
    //     last: "Soni",
    //     avatar: "https://avatars.githubusercontent.com/u/101723031?s=96&v=4https://pps.whatsapp.net/v/t61.24694-24/309786879_1059288558097683_6825274734920459211_n.jpg?ccb=11-4&oh=01_AdSOAgFCUiWcGLTffJ5g-zU0qNqWKEDZ8hXf5YgAWtoYcQ&oe=64182FB5",
    //     twitter: "suchit1010",
    //     notes: "Curious Astrophile💫| Web Developer | DevOps enthusiastic + Learner 🕸️ | Open Source Contributor",
    //     favorite: true,
    // };

    return (
        <div id="contact">
            <div>
             <img src={contact.avatar || null } key={contact.avatar} />
            </div>

            <div>
                <h1>{ contact.first || contact.last ? (
                   <>
                   {contact.first} {contact.last}
                   </>
                ) : (
                    <i>No Name</i>

                )}{" "}
                <Favorite contact={contact}/>
                </h1>


                {contact.twitter && (
                    <p>
                        <a target="_blank" href={'https://twitter.com/${contact.twitter}'}>
                            {contact.twitter}
                        </a>
                    </p>
                )}
                
                {contact.notes && <p>{contact.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Edit</button>
                    </Form>
                    <Form method="post" action="destroy" onSubmit={(event)=> {
                        if ( !confirm("Please confirm you to delet this record.")){
                            event.preventDefault();
                        }
                    }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>

                 

            </div>
        </div>
        

    );
}

function Favorite({ contact }) {
    // yes, this is a `let` for later
    let favorite = contact.favorite;
    return (
      <Form method="post">
        <button
          name="favorite"
          value={favorite ? "false" : "true"}
          aria-label={
            favorite
              ? "Remove from favorites"
              : "Add to favorites"
          }
        >
          {favorite ? "★" : "☆"}
        </button>
      </Form>
    );
  }
