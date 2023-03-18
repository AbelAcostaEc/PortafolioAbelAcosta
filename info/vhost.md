# vHosts Xampp - Windows

1.- `C:\Windows\System32\drivers\etc` in "hosts"

```sh
127.0.0.1 miproyecto.local.com
```

2.- `C:\xampp\apache\conf\extra`

```sh
<VirtualHost \*>
   DocumentRoot "C:\miproyecto\httpdocs"
   ServerName miproyecto.local.com
   <Directory "C:\miproyecto\httpdocs">
   Require all granted
   </Directory>
</VirtualHost>
```
