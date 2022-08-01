import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { deleteEvents, getEvents } from "../../services/service";
import Menu from "../Menu/Menu";
import Moment from 'react-moment';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { BsPencilSquare, BsFillTrashFill } from "react-icons/bs";
const MySwal = withReactContent(Swal)
const Table = () => {

    const [events, setEvents] = useState([])
    let navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('@Auth:token');
        if (!token) {
            navigate("/", { replace: true });
        }
    }, [])

    useEffect(() => {
        getEvents().then((res: any) => {
            console.log(res.data)
            if (res.status === 403) {
                localStorage.clear();
                navigate("/")
            }
            setEvents(res.data)
        })
    }, [])

    const handleDelete = (id: number) => {
        MySwal.fire({
            title: 'Tem certeza que deseja deleter esse registro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, deletar!'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteEvents(id).then((res: any) => {
                    console.log(res)
                    if (res.status === 403) {
                        localStorage.clear();
                        navigate("/")
                    }
                    if (res.status === 200) {
                        MySwal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        ).then(() => {
                            navigate('/table/')
                        })
                    } else {
                        MySwal.fire({
                            title: <strong>Error!</strong>,
                            html: <i>Procure o adm de sistemas!</i>,
                            icon: 'error'
                        })
                    }

                })

                navigate('')

            }
        })
    }

    return (
        <>
            <Menu />
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Título</th>
                            <th scope="col">Descrição</th>
                            <th scope="col">Data</th>
                            <th scope="col">Cor</th>
                            <th scope="col">Criação</th>
                            <th scope="col">Atualização</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            events.map(({ id, titulo, descricao, data, cor, created_at, updated_at, deleted_at }) => {
                                return (
                                    <tr >
                                        <th key={id} scope="row">{id}</th>
                                        <td>{titulo}</td>
                                        <td>{descricao}</td>
                                        <td>
                                            <Moment format="DD/MM/YYYY hh:mm:ss">{data}
                                            </Moment>
                                        </td>
                                        <td style={{ background: cor }} className="tdInverter">{cor}</td>
                                        <td><Moment format="DD/MM/YYYY hh:mm:ss">{created_at}
                                        </Moment>
                                        </td>
                                        <td>

                                            <Moment format="DD/MM/YYYY hh:mm:ss">{updated_at}
                                            </Moment>
                                        </td>
                                        <td ><Link style={{ marginRight: '15px' }} to={{
                                            pathname: `/register/${id}`
                                        }}> <BsPencilSquare />
                                        </Link>
                                            <a href="#" onClick={() => handleDelete(id)} className='text-danger'><BsFillTrashFill /></a></td>
                                    </tr>
                                )
                            })
                        }



                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Table;