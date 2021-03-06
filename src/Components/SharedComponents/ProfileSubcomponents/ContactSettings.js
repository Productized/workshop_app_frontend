import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../../Context/UserContext';

const ContactSettings = ({ handleIsSaved }) => {

    const {register, handleSubmit, errors } = useForm();

  const { user, confirmUpdatedUser } = useContext(UserContext);


    const onSubmit = (data) => {

        const updatedUser = {
        id: user.id,
        country: data.country,
        company: data.company,
        position: data.position
        };

        handleIsSaved()
        confirmUpdatedUser(updatedUser);
    };


    return(
        <div className="contact-settings">
            <h2 className="contact-settings-title" >Contact Settings</h2>
            <form className="contact-settings-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="country-company">
                    <div className="label-input">
                        <label htmlFor="country">Country</label>
                        <input
                          name="country"
                          id="country"
                        defaultValue={user.country}
                          type="text"
                          ref={register} />
                    </div>
                    <div className="label-input">
                        <label htmlFor="company">Company</label>
                        <input
                          name="company"
                          id="company"
                            defaultValue={user.company}
                          type="text"
                          ref={register} />
                    </div>
                </div>
                <div className="position">
                    <div className="label-input">
                        <label htmlFor="position">Position</label>
                        <input
                          name="position"
                          id="position"
                          defaultValue={user.position}
                          type="text"
                          ref={register} />
                    </div>
                </div>
                <button type="submit">Save Settings</button>
            </form>
        </div>
    );
}

export default ContactSettings;