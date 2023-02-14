import React from 'react';


const optionsStyles= "bg-white text-primary w-full"

const Selector = ({ name, value, onChange, label, options }) => {
    return (
        <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className='border-2 dark:border-dark-subtle border-light-subtle
                      dark:focus:border-white focus:border-primary p-1 pr-10
                        dark:text-dark-subtle text-light-subtle
                        dark:focus:text-white focus:text-primary
                       rounded bg-transparent outline-none transition w-full'>

            <option value={label} className={optionsStyles}>{label}</option>
            {options.map(({ title, value }) => {
                return <option key={title} value={value} className={optionsStyles}> {title}</option>
            })}
        </select>
    );
}

export default Selector;
