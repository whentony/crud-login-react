import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Menu from '../Menu/Menu';
import { SketchPicker } from 'react-color';
import { detailsEvents, eventsRegister, updateEvents } from '../../services/service';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import moment from 'moment';

const MySwal = withReactContent(Swal)
const Register = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [color, setColor] = useState('#fff')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [Eid, setEid] = useState(0);
    useEffect(() => {
        if (id) {
            setEid(id)
            detailsEvents(id).then((res: any) => {
                setTitle(res.data.titulo)
                setColor(res.data.cor)
                setDescription(res.data.descricao)
                let dataFormat = moment(res.data.data, 'YYYY-MM-DD HH:mm:SS').format('yyyy-MM-DD')
                setDate(dataFormat)
            })
        }
    }, [id])
    useEffect(() => {
        const token = localStorage.getItem('@Auth:token');
        if (!token) {
            navigate("/", { replace: true });
        }
    }, [])
    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (id === null) {
            eventsRegister(title, description, color, date).then((res: any) => {
                console.log(res.status)
                if (res.status === 403) {
                    localStorage.clear();
                    navigate("/")
                }
                if (res.status === 201) {
                    MySwal.fire({
                        title: <strong>Cadastro!</strong>,
                        html: <i>Cadastro realizado com sucesso!</i>,
                        icon: 'success'
                    }).then(() => {
                        navigate("/table")
                    })
                } else {
                    MySwal.fire({
                        title: <strong>Error!</strong>,
                        html: <i>Procure o adm de sistemas!</i>,
                        icon: 'error'
                    })
                }
            })
        } else {
            updateEvents(Eid, title, description, color, date).then((res: any) => {
                console.log(res.status)
                if (res.status === 403) {
                    localStorage.clear();
                    navigate("/")
                }
                if (res.status === 200) {
                    MySwal.fire({
                        title: <strong>Cadastro!</strong>,
                        html: <i>Alteração realizada com sucesso!</i>,
                        icon: 'success'
                    }).then(() => {
                        navigate("/table")
                    })
                } else {
                    MySwal.fire({
                        title: <strong>Error!</strong>,
                        html: <i>Procure o adm de sistemas!</i>,
                        icon: 'error'
                    })
                }
            })
        }

    }
    const handleChangeComplete = (color) => {
        console.log(color)
        setColor(color.hex)
    };
    return (
        <>
            <Menu />
            <div className='container'>
                <h1>Register</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="title">Título</label>
                            <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Título" required />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="description">Descrição</label>
                            <input type="text" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Descrição" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Data</label>
                        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="form-control" id="date" />
                    </div>
                    <div>
                        <SketchPicker
                            color={color}
                            onChangeComplete={handleChangeComplete}
                        />

                    </div>
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </form>
            </div>
        </>
    )
}

export default Register;