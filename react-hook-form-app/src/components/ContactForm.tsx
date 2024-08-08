import { useForm } from "react-hook-form"
import {DevTool} from "@hookform/devtools"
import { useEffect } from "react";


type FormValue = {
    name: string;
    email: string;
    message: string;

}
const ContactForm = () => {
    const form = useForm<FormValue>({
        defaultValues: {
            name: "",
            email: "",
            message: ""
        }
    })

    const {register, formState, handleSubmit, control, reset} = form
    const {errors, isSubmitSuccessful} = formState

    const onSubmit =  (data: FormValue) => {
        console.log("data submitted", data)
    }

    useEffect(() => {
        if(isSubmitSuccessful){
            setTimeout(() => reset(), 2000)
        }
    },[isSubmitSuccessful, reset])


  return (
    <div className="contact-form">
        <h1>Contact Information</h1>
        <form onSubmit={handleSubmit(onSubmit)} noValidate >
            <div className="form-row">
                <label htmlFor="name">Name</label>
                <input className={errors.name ? "error-input" : "normal-input"} type="text" id="name" {...register("name", {
                    required: {
                        value: true,
                        message: "Name is required."
                    },
                })} />
                <p className="error">{errors.name?.message}</p>
            </div>

            <div className="form-row">
                <label htmlFor="email">Email</label>
                <input className={errors.email ? "error-input" : "normal-input"} type="email" id="email" {...register("email", {
                    required: {
                        value: true,
                        message: "Email is required."
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Invalid email address",
                                           
                    }

                })} />
                <p className="error">{errors.email?.message}</p>
            </div>

            <div className="form-row">
                <label htmlFor="message">Message</label>
                <input className={errors.message ? "error-input" : "normal-input"} type="text" id="message" {...register("message", {
                    required: {
                        value: true,
                        message: "Message is required."
                    },

                })} />
                <p className="error">{errors.message?.message}</p>
            </div>
                
            <button>
                Submit
            </button>
        </form> 
        <DevTool control={control} />
        <div >
            {isSubmitSuccessful && <p className="alert">You have successfully submitted the form!</p>}
        </div>
    </div>
  )
}

export default ContactForm