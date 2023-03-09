import { Formik } from 'formik'
import * as Yup from 'yup'
import './MensajesHeader.component.css'

export default function MensajesHeader(props) {
	const validaciones = Yup.object().shape({
		asunto: Yup.string()
			.required('Por favor, escribe un asunto.')
			.min(3, 'Mínimos 3 carácteres.'),
		email: Yup.string().email().required('Por favor, escribe una email.'),
		mensaje: Yup.string()
			.required('Por favor, escribe un mensaje')
			.min(10, 'Mínimos 10 carácteres.'),
	})

	let initialValues = { asunto: '', email: '', mensaje: '' }

	return (
		<div className='MensajesHeader'>
			<Formik
				validationSchema={validaciones}
				initialValues={initialValues}
				onSubmit={async (values, actions) => {
					props.clickNuevo(values)
					await new Promise((r) => setTimeout(r, 500))
					actions.setSubmitting(false)
				}}
			>
				{({ values, handleChange, handleSubmit, isSubmitting, errors }) => (
					<form onSubmit={handleSubmit} className='Formulario'>
						<div className='Elemento'>
							<input
								placeholder='Asunto'
								type='text'
								name='asunto'
								onChange={handleChange}
								value={values.asunto}
							/>
							{errors.asunto ? <div>{errors.asunto}</div> : null}
						</div>
						<div className='Elemento'>
							<input
								placeholder='Email'
								name='email'
								onChange={handleChange}
								value={values.email}
							/>
							{errors.email ? <div>{errors.email}</div> : null}
						</div>
						<div className='Elemento'>
							<input
								placeholder='Mensaje'
								name='mensaje'
								onChange={handleChange}
								value={values.mensaje}
							/>
							{errors.mensaje ? <div>{errors.mensaje}</div> : null}
						</div>
						<button className='Nuevo' type='submit' disabled={isSubmitting}>
							Enviar
						</button>
					</form>
				)}
			</Formik>
			<button onClick={props.clickEliminar} className='Vaciar'>
				Vaciar
			</button>
		</div>
	)
}
