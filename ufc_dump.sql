PGDMP     "    1                w         
   survey-app    12.1    12.1     :           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ;           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            <           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            =           1262    24585 
   survey-app    DATABASE     �   CREATE DATABASE "survey-app" WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'English_United States.1252' LC_CTYPE = 'English_United States.1252';
    DROP DATABASE "survey-app";
                heondo    false            .          0    24588    users 
   TABLE DATA           X   COPY public.users (id, first, last, email, password, deleted, date_created) FROM stdin;
    public          postgres    false    203   �       1          0    32792    surveys 
   TABLE DATA           O   COPY public.surveys (id, user_id, survey_name, open, date_created) FROM stdin;
    public          postgres    false    206   �       4          0    32808 	   questions 
   TABLE DATA           Y   COPY public.questions (id, survey_id, question_name, question_type, options) FROM stdin;
    public          postgres    false    209   �       7          0    40984 	   responses 
   TABLE DATA           W   COPY public.responses (id, question_id, group_id, response, date_response) FROM stdin;
    public          postgres    false    212   �       >           0    0    questions_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.questions_id_seq', 21, true);
          public          postgres    false    207            ?           0    0    questions_survey_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.questions_survey_id_seq', 1, false);
          public          postgres    false    208            @           0    0    responses_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.responses_id_seq', 37, true);
          public          postgres    false    210            A           0    0    responses_question_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('public.responses_question_id_seq', 1, false);
          public          postgres    false    211            B           0    0    surveys_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.surveys_id_seq', 18, true);
          public          postgres    false    204            C           0    0    surveys_user_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.surveys_user_id_seq', 1, false);
          public          postgres    false    205            D           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 22, true);
          public          postgres    false    202            .   �   x���AO�0@���WX�!��IM6�6���Iv��Bu�
3�zI�x�����QZ���ʦ��lnʚ��[�l�6%����%�c�|/w��+=Ɏ�&��,_�*�X��]�<��,+m\x�}hy ř7R�Ө	
�4Z�P��=��@�1���.͟2�������kxr/Pj�2��Vnq�m6���=�]j�n���)"?��o �3�R�N�4���^3D�¬�kY�/\��      1   '  x����N�0��s�y�F�'�߁W.
�46цM{{���ur��ǖ}����t.f�Oëf|��f�ǩorC��!v��:PH��عR��
�B	<\��8���k�<�����0�C�1\gĠWԃ��)���%s���
r
����.���Z� ,�)��0�p�R�n�b��2� 
��!�qA)��QpY�ُ��P\Ju�"���[���r�삮����C$�0��т��e��1"��{'ی�e-�d� n���-���Z�d�n,�q�q�l۶�rՒ$      4   �  x�œ�N�0��ۧX�L����	�B�8p n�!V�8�NC�xw��UVS�"�R+��oc��͔A��ؑ�m��~�i��EE�]�V��D�8��H�����C���؈?Jt!�U�l�[��Z���NX�9�QN�孩���Fl���iEԷ�j��GG�������M�B�xS־�_j2nZ���h�,֥/�qb��U�ó�=��`�<G�Y��h3��J%q�kL�rk][�aY�N��w�(Mʷ�<���n���>۷�q �xn ]m���Ց��z�R���P�x�'��̡���#7��!�_c	8�B<�N��2��/���@�R���'����{���\���Ib'�����ݞ=� &�u}I���@�3p5�ў��'��\-a�y g��GCp��ю��D�q���> uE�J      7   �  x����n�0�g�)�(QWo:�zR�]p7qP#�D�з?��űS������$%
��1�QŵRk�B�Ja�$u�և5�U ���˳��y�����@ˁ�P�}�5�}�^��)��9'-�2��D*�Lnu	�\�`�������E?��U�B�	h3���x�w�W+rm0��`5p��ݮ/�2�>��$�^�R$+[H͖��Yc�#mЎl�����w%4іL&�l�N�9j�D�Q�U,�����<��<���q��H#�G���o2���(r�ț�'èVҪ���z�pW4罛��EB�x-#���}!�Q�ǵ"d�u�SsL���k�R��� <���К7�R^����)8f�z~Jl^rf/�,g�<_+�ߜ^��*4Z�&��9�+�����O�V����*�     