--
-- PostgreSQL database dump
--

-- Dumped from database version 11.16 (Debian 11.16-1.pgdg90+1)
-- Dumped by pg_dump version 11.16 (Debian 11.16-1.pgdg90+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: Empleados; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Empleados" (id, nombres, apellidos, direccion, telefono, curp, genero, url_image) FROM stdin;
02ddab61-3930-4d9a-b0dd-dcee58656782	Ana	García	Calle de la Rosa 123	1045678912	GAGA900212MDFRRN02	F	https://firebasestorage.googleapis.com/v0/b/smmi-874a3.appspot.com/o/medicos%2Fd2.jpg?alt=media&token=8b7cb175-335b-49d4-8822-962b7dff0310
402a233a-d371-4a1e-a5ff-3da2edd0b2cd	Carlos	Martínez	Boulevard del Sol 789	1076543210	MACA880120HDFRRL09	M	https://firebasestorage.googleapis.com/v0/b/smmi-874a3.appspot.com/o/medicos%2Fd1.jpg?alt=media&token=daf48763-f1c6-4192-bac3-765b94bae48c
aa3b6349-75d8-4fb6-80b3-ed3792f27034	José	Pérez	Calle del Parque 567	1098765432	PEPJ850512HDFRLS01	M	https://firebasestorage.googleapis.com/v0/b/smmi-874a3.appspot.com/o/medicos%2Fd3.jpg?alt=media&token=7e5dd42d-79bc-4d67-b7d7-bb8373ec7695
b29bc4c9-ef0a-44e2-a296-194ce90524a7	Luis	González	Avenida Central 789	1090123456	GOLU881015HDFRRR04	M	https://firebasestorage.googleapis.com/v0/b/smmi-874a3.appspot.com/o/medicos%2Fd4.jpg?alt=media&token=aff654dc-b573-4bb1-b24f-4517393b55b0
c857ba96-6816-402a-9f45-ba4e87c3dba1	Pedro	Ramírez	Boulevard de los Sueños 321	1087654321	RAPJ900911HDFRRD08	M	https://firebasestorage.googleapis.com/v0/b/smmi-874a3.appspot.com/o/medicos%2Fd5.jpg?alt=media&token=c3b1033b-6a48-4020-8673-ed99e1dae57e
5db59a0b-9e8c-4f9a-8775-7594d2e3e8e1	Ian	Lopez	Avenida Independencia 456	1059876543	IOPJ900405HDFRPN0L	M	https://firebasestorage.googleapis.com/v0/b/smmi-874a3.appspot.com/o/enfermeras%2Ff1.jpg?alt=media&token=9f3cb207-9fe3-416e-9fdc-eeee09cd44d7
86753a55-aa16-4293-b6c9-9ccb47b4d339	Laura	Gómez	Calle Primavera 123	1045678912	GOLA900212MDFRRN04	F	https://firebasestorage.googleapis.com/v0/b/smmi-874a3.appspot.com/o/enfermeras%2Ff2.png?alt=media&token=c9fee5cd-9599-4bbd-ba8a-614a642fd205
6824f73b-016e-44fe-a4fa-f293094cfc7e	Sofía	Martínez	Boulevard del Sol 789	1076543210	MASO880120HDFRRL01	F	https://firebasestorage.googleapis.com/v0/b/smmi-874a3.appspot.com/o/enfermeras%2Ff3.jpg?alt=media&token=6fc07882-30e3-493f-bf55-bff390d87ed8
9b5d6b97-6827-42b3-96ea-0c9ab2763d3c	Isabella	Hernández	Avenida Libertad 234	1029384756	HEHI920318MDFRLR03	F	https://firebasestorage.googleapis.com/v0/b/smmi-874a3.appspot.com/o/enfermeras%2Ff4.jpg?alt=media&token=f04d7686-048d-41bb-bf84-270d9270bbed
943e0636-6686-4b23-ba89-2c21142fc5d0	Camila	Pérez	Calle del Parque 567	1098765432	PEPC850512HDFRLS02	F	https://firebasestorage.googleapis.com/v0/b/smmi-874a3.appspot.com/o/enfermeras%2Ff5.png?alt=media&token=50df612c-c02c-43f1-b024-557737baad79
34aeecd5-be06-4d3e-9bf8-134cdf649ee1	Ana	García	Calle de la Rosa 123, Ciudad, País	9045678912	AAGA900212MDFRRN02	F	https://firebasestorage.googleapis.com/v0/b/smmi-874a3.appspot.com/o/admins%2Fa4.png?alt=media&token=0c76a42d-b3f4-431c-8528-8bd3fbf3bed3
2616c295-0f40-4eb1-b6fe-ad62cec25bf3	Carlos	Pérez Gómez	Avenida Siempre Viva 456, Ciudad, País	0987654321	CPGHIJKLMN1234511M	M	https://firebasestorage.googleapis.com/v0/b/smmi-874a3.appspot.com/o/admins%2Fa1.jpg?alt=media&token=60440610-c8df-45db-ae98-9db1ead854dd
c7dd3bcc-c045-4ae3-b9a1-d90f7ea452a3	Juan	Ramírez Ortega	Boulevard del Sol 1234, Ciudad, País	2233445566	JROHJKLMN12345612M	M	https://firebasestorage.googleapis.com/v0/b/smmi-874a3.appspot.com/o/admins%2Fa2.jpg?alt=media&token=a83bdbc9-42cd-4312-ac85-ae7e55688ece
a7c8ea72-2bac-43e0-90d7-901d991f0d02	Miguel	González Fernández	Plaza Mayor 567, Ciudad, País	3344556677	MGFJKLMN123456799M	M	https://firebasestorage.googleapis.com/v0/b/smmi-874a3.appspot.com/o/admins%2Fa3.jpg?alt=media&token=67609a76-211a-43b2-8ce6-cbd5c7eb74aa
60331871-053d-4c0d-84c9-0e5e6c1f6f64	Manuel	Martínez Ruiz	Calle del Río 890, Ciudad, País	4455667788	LMRABCDEFGHI123134M	M	https://randomuser.me/api/portraits/men/5.jpg
\.


--
-- Data for Name: Administrador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Administrador" ("matriculaAdmin", contrasena, conocimiento_auxilios, nivel_educacion, "idEmpleado") FROM stdin;
A10086A	$2b$10$Cifh1BoMbMfJIZuXUAkSyOL0tDoig6nyPqcVMMWEb3mk67xBY/Qsi	t	SUPERIOR	34aeecd5-be06-4d3e-9bf8-134cdf649ee1
A41137C	$2b$10$R0RQyGZ3ppiDC8weuslxXOZC6SeGCQYycWlcIp4uwoQF9ab.LE2Ie	f	MEDIA SUPERIOR	2616c295-0f40-4eb1-b6fe-ad62cec25bf3
A41825J	$2b$10$b2Q3kphiZT7bP5tUdq/nVOHn6XtsqXCNmQS.4FSDc/oV.FlZwGrqW	f	BASICA	c7dd3bcc-c045-4ae3-b9a1-d90f7ea452a3
A55410M	$2b$10$.kMyiobDQJL6fPA0oDX6wupqpMZUi4ztBuAan9Q6/oh0Pq8YHQea6	t	SUPERIOR	a7c8ea72-2bac-43e0-90d7-901d991f0d02
A77745L	$2b$10$A6s1UdxI6aoc588vpi5Zq.MVLIxNNcHiikBwi2VbhxnZDv3mqs2Eu	f	SUPERIOR	60331871-053d-4c0d-84c9-0e5e6c1f6f64
\.


--
-- Data for Name: Catalogo_Especialidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Catalogo_Especialidades" (id, nombre_especialidad, descipcion) FROM stdin;
1	Cardiología	Especialidad médica dedicada al diagnóstico y tratamiento de las enfermedades del corazón y del sistema cardiovascular.
2	Neurología	Rama de la medicina que se ocupa del estudio y tratamiento de los trastornos del sistema nervioso.
3	Pediatría	Rama de la medicina dedicada a la atención y tratamiento de las enfermedades de los niños y adolescentes.
4	Ginecología	Especialidad médica que se centra en la salud del sistema reproductor femenino y el tratamiento de sus enfermedades.
5	Gastroenterología	Rama de la medicina que se ocupa del estudio, diagnóstico y tratamiento de las enfermedades del sistema digestivo.
6	Dermatología	Especialidad médica que se enfoca en el diagnóstico y tratamiento de las enfermedades de la piel.
7	Nefrología	Rama de la medicina que se ocupa del estudio, diagnóstico y tratamiento de las enfermedades del riñón y del sistema urinario.
\.


--
-- Data for Name: Catalogo_Sensores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Catalogo_Sensores" (id, nombre_sensor, topico, unidad_medida) FROM stdin;
1	Oxigenacion	/oxig	SpO2
2	Frecuencia Cardiaca	/freqCard	bpm
3	Presion Arterial Sistolica	/presArtsist	mmHg
4	Presion Arterial Diastolica	/presArtdiast	mmHg
5	Temperatura Corporal	/tempCorp	°C
\.


--
-- Data for Name: Habitaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Habitaciones" (id_habitacion, nombre_habitacion, ocupado) FROM stdin;
1	SMMI-A	f
2	SMMI-B	f
3	SMMI-C	f
4	SMMI-D	f
5	SMMI-E	f
6	SMMI-F	f
7	SMMI-G	f
8	SMMI-H	f
\.


--
-- Data for Name: ConfigSensor; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ConfigSensor" (id, fecha_actualizacion, max_valor, min_valor, topico_sensor, "habitacionIdHabitacion") FROM stdin;
1	2024-06-08 23:21:05.996708	150	50	/freqCard	1
2	2024-06-08 23:21:06.007393	100	94	/oxig	1
3	2024-06-08 23:21:06.009688	120	90	/presArtsist	1
4	2024-06-08 23:21:06.012096	80	60	/presArtdiast	1
5	2024-06-08 23:21:06.014185	37	36	/tempCorp	1
\.


--
-- Data for Name: Data_Sensors; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Data_Sensors" (id, fecha_registro, valor_registrado, id_catalogo_sensor, id_habitacion) FROM stdin;
\.


--
-- Data for Name: Enfermeras; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Enfermeras" ("matriculaEnfermera", cedula, contrasena, habilidades_tecnicas, "idEmpleado") FROM stdin;
E90245I	90245650	$2b$10$SGqQ9SroMgbrO6XcQun.LeYiK6qOk.zq.fsROg94Vrb0DyKKTcwvO	{"sabe programar"}	5db59a0b-9e8c-4f9a-8775-7594d2e3e8e1
E81234G	81234560	$2b$10$4SrefsKguu456oo3Cie2uupZCB/nKj.Xbr042OFuVlMO.mAOo08Xe	{"analiza datos"}	86753a55-aa16-4293-b6c9-9ccb47b4d339
E91256M	91256780	$2b$10$gs4C4Uwlg9UQhxJ7xeZG4u8Da4mV/QskTItAfhKWNHnkWsRymLJ4a	{"diseña ropa"}	6824f73b-016e-44fe-a4fa-f293094cfc7e
E82345H	82345670	$2b$10$IhQTviZq1JguzpoZQRO/OOPQToWCrtibgdX7gdWS3KOh0R2EU3Rca	{"gestiona proyectos"}	9b5d6b97-6827-42b3-96ea-0c9ab2763d3c
E93456P	93456780	$2b$10$B/Acqt5T1T8nL8csXEjW6.cFOIk9mxS..LHAAH68skkEsi0efK/v6	{"cursos de proteccion"}	943e0636-6686-4b23-ba89-2c21142fc5d0
\.


--
-- Data for Name: Ingresos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Ingresos" (id_ingreso, fecha_ingreso, hora_ingreso, nombres, apellidos, sexo, edad, padecimientos, alergias, causa_ingreso, de_alta, fecha_actualizacion, "idEnfermeraMatriculaEnfermera", "idEspecialidadId", "habitacionIdHabitacion") FROM stdin;
\.


--
-- Data for Name: Medicos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Medicos" ("matriculaMedico", cedula, contrasena, "idEmpleado") FROM stdin;
M81234G	81234567	$2b$10$8ROS/oE8K.oPOvk5QOE3MOO0XyLiM5TxGteiX/1b1KRUFMitvblKm	02ddab61-3930-4d9a-b0dd-dcee58656782
M91256M	91256789	$2b$10$7FFzsp32F76rkHRkpPlwQ.lqOsCKVyXG/UFFFSWzy56uydQfRK/M.	402a233a-d371-4a1e-a5ff-3da2edd0b2cd
M93456P	93456789	$2b$10$yU2cb2HO4oPxYv8/N86WserNjGdkVgJHGLm2KirjZm2NUSUX/x2Le	aa3b6349-75d8-4fb6-80b3-ed3792f27034
M85761G	85761234	$2b$10$5ixwhvszqt55mywH.I.DZe20Thveca0rcfQmT42GkJHqr632lkWgu	b29bc4c9-ef0a-44e2-a296-194ce90524a7
M97861R	97861234	$2b$10$XobvxwozdvlYtjlXWEIqpuuKsxzGxjrE8Aw4PkMqWdRpFE7rWIsNi	c857ba96-6816-402a-9f45-ba4e87c3dba1
\.


--
-- Data for Name: Medico_Especialidad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Medico_Especialidad" (matricula_medico, especialidad_id) FROM stdin;
M81234G	3
M81234G	4
M91256M	5
M91256M	2
M93456P	4
M93456P	6
M85761G	1
M97861R	1
M97861R	2
\.


--
-- Data for Name: Receta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Receta" (id_receta, medicamentos, indicaciones_addic, fecha_registro, "medicoMatriculaMedico", "ingresoIdIngreso") FROM stdin;
\.


--
-- Data for Name: ReporteAlerta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."ReporteAlerta" (id_reporte, duracion_emergencia_sg, fecha_registro, sensores_reporte, evento_critico, acciones_tomadas, completado, id_ingreso) FROM stdin;
\.


--
-- Name: Catalogo_Especialidades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Catalogo_Especialidades_id_seq"', 7, true);


--
-- Name: Catalogo_Sensores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Catalogo_Sensores_id_seq"', 5, true);


--
-- Name: ConfigSensor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."ConfigSensor_id_seq"', 5, true);


--
-- Name: Data_Sensors_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Data_Sensors_id_seq"', 1, false);


--
-- Name: Habitaciones_id_habitacion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Habitaciones_id_habitacion_seq"', 8, true);


--
-- PostgreSQL database dump complete
--

